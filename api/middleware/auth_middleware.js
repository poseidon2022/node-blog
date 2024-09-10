require("dotenv").config()
const generateAccessToken = require("../utils/createaccesstoken")
const generateRefreshToken = require("../utils/createrefreshtoken")
const jwt = require("jsonwebtoken")
class AuthenticationMiddleWare {
    constructor(loginRepository) {
        this.loginRepository = loginRepository
    }
    
    authenticate = async (req, res, next) => {
        const accessToken = req.headers['authorization']
        const refreshToken = req.cookies["refreshToken"]
        if (!accessToken && !refreshToken) {
            return res.status(401).json({
                success : false,
                message : "access token not provided"
            })
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
            req.user = decoded.user
            next()
        } catch(err) {
            if (!refreshToken) {
                return res.status(401).json({
                    success : false,
                    message : "access denied. no refresh token provided"
                })
            } 

            try {
                const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
                const accessToken = generateAccessToken(decoded.user)
                const refreshToken = generateRefreshToken(decoded.user)
                await this.loginRepository.RefreshToken(decoded.user.email, refreshToken)
                return res
                    .header("Authorization", accessToken)
                    .cookies("refreshToken", refreshToken, {httpOnly : true, sameSite : 'strict'})
                    .json({
                        success : true,
                        message : decoded.user
                    })
            } catch(err) {
                res.status(400).json({
                    success : false,
                    message : "invalid token"
                })
            }
        }
    }
}

module.exports = AuthenticationMiddleWare