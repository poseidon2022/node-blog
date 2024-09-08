const bcrypt = require("bcrypt")
class SignupController {
    constructor(signupUseCase) {
        this.signupUseCase = signupUseCase
    }

    async Signup(req, res) {
        const {name, email, password, otp} = req.body
        if (!name || !email || !password || !otp) {
            res.status(403).json({
                success : false,
                message : "invalid request format, required information missing"
            })
        }
        try {
            const hashedPwd = await bcrypt.hash(password, 10)
            const newUser = await this.signupUseCase.Signup(name,email,hashedPwd,otp)
            res.status(200).json({
                success : true,
                message : "user created successfully",
                user : newUser
            })
        } catch(err) {
            res.status(500).json({
                success : false,
                message : err.message
            })
        }
    }
}

module.exports = SignupController