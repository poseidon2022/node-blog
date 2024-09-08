const otpGenerator = require("otp-generator")

const generateOTP = () => {
    const generatedOTP = otpGenerator.generate(6, {
        
    })
    return generatedOTP
}

module.exports = generateOTP