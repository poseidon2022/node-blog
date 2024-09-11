const jwt = require("jsonwebtoken")
const generateAccessToken = require("../utils/createaccesstoken")
require("dotenv").config()
class RefreshTokenController {
    constructor(refreshTokenUseCase) {
        this.refreshTokenUseCase = refreshTokenUseCase
    }

    async RefreshAccessToken(req, res) {
        console.log(req.cookies)
        const refreshToken = req.cookies["refreshToken"]
        const user_email = req.user.email

        console.log(user_email)
        if (!refreshToken) {
            res.status(403).json({
                success : false,
                message : "no refresh token provided"
            })
        }
        
        try {
            const storedRefreshToken = await this.refreshTokenUseCase(user_email)
            if (refreshToken != storedRefreshToken.refresh_token) {
                res.status(403).json({
                    success : false,
                    message : "invalid refresh token"
                })
            } 
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
            const accessToken = generateAccessToken(decoded.user)
            res
            .header("Authorization", accessToken)
            .json({
                success : true,
                message : "access token updated successfully"
            })
        } catch(err) {
            res.status(401).json({
                success : false,
                message : "internal server error"
            })
        }
    }
}


module.exports = RefreshTokenController