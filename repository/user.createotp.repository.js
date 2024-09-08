const OTP = require("../models/otp.model.js")
class OtpRepository {
    async CreateOtp(otp, email) {
        try {
            const createdOtp = await OTP.create({email, otp})
            return createdOtp
        } catch(err) {
            console.log(err.message)
            throw new Error("error while adding otp to the database")
        }
    }
}

module.exports = OtpRepository