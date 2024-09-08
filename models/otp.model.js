const mongoose = require("mongoose")
const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    }, 
    otp : {
        type : String,
        required : true
    },
    created_at : {
        type : Date,
        expires : '5m',
        default : Date.now
    }
})

const OTP = mongoose.model("otps", otpSchema)
module.exports = OTP