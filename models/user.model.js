const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : false
    }, 
    email : {
        type : String,
        required : false
    },
    password : {
        type : String,
        required : true
    }, 
    otp : {
        type : String,
        required : true
    }
}, {timestamp:true})

// my model works this way. it has its own otp schema, with the user email and expiry time
//if the user verification email is sent and at the verify, if the users entered otp is
//the same as the one stored in the otp table, the user is signed in and a document is created in the DB, other wise invalid OTP

