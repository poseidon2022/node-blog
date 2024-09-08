const generateAccessToken = require("../utils/createaccesstoken")
const generateRefreshToken = require("../utils/createrefreshtoken")
const bcrypt = require("bcrypt")
class LoginController {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase
    }
    
    async Login(req, res) {
        const {email, password} = req.body
        if (!email || !password) {
            res.status(403).json({
                success : false,
                message : "invalid request, email and password required"
            })
        }
        try {
            const foundUser = await this.loginUseCase.Login(email)
            if (!foundUser) {
                res.status(404).json({
                    success : false,
                    message : "user with the specified email not found"
                })
            } 

            const hashedPassword = foundUser.password
            await bcrypt.compare(password,hashedPassword)

            const tokenization_parameters = {
                email : email,
                user_id : foundUser._id.toString()
            }

            const accessToken = generateAccessToken(tokenization_parameters)
            const refreshToken = generateRefreshToken(tokenization_parameters)
            await this.loginUseCase.RefreshToken(email, refreshToken)

            res
            .cookie('refreshToken', refreshToken, {httpOnly : true, sameSite : 'strict'})
            .header('Authorization', accessToken)
            .json({
                success : true,
                message : "user logged in successfully"
            })
        } catch(err) {
            res.status(500).json({
                success : false,
                message : err.message
            })
        }
    }
}

module.exports = LoginController