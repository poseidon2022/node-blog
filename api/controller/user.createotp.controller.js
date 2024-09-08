const generateOTP = require("../utils/otp.js")
class OtpController {
    constructor(otpUseCase) {
        this.otpUseCase = otpUseCase
    }

    async CreateOtp(req, res) {
        //create otp and send email here
        const {email} = req.body
        try {
            const otp = generateOTP()
            const createdOtp = await this.otpUseCase.CreateOtp(otp, email)
            //the email sending functionality here now
            res.status(200).json({
                success : true,
                message : "otp created successfully and verification email sent"
            })
        } catch(err) {
            res.status(500).json({
                success : false,
                message : "error while creating otp"
            })
        }
    }
}