const mongoose = require("mongoose")
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
        default : Date.now
    }
})

const Refresh = mongoose.model("refreshtoken", refreshSchema)
module.exports = Refresh