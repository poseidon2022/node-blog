const otpGenerator = require("otp-generator")

const generateOTP = () => {
    const generatedOTP = otpGenerator.generate(6, {
        digits : true,
        alphabets : false,
        upperCase : false,
        specialChars : false
    })
    return generatedOTP
}

module.exports = generateOTP