const mongoose = require("mongoose")
require("dotenv").config()
const refreshSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    refresh_token : {
        type : String,
        required : true
    }, 
    created_at : {
        type : Date,
        expires : process.env.REFRESH_EXPIRY,
        default : Date.now,
    }
})

const Refresh = mongoose.model("refreshtoken", refreshSchema)
module.exports = Refresh