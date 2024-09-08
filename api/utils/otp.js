const otpGenerator = require("otp-generator")

const generateOTP = () => {
    const generatedOTP = otpGenerator.generate(6, {
        upperCaseAlphabets : false,
        lowerCaseAlphabets : false,
        specialChars : false
    })
    return generatedOTP
}

module.exports = generateOTP