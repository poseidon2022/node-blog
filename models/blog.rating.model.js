const mongoose = require("mongoose")
const ratingSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    blog_id : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    user_id : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        default : 0,
    }
}, {timestamps : true})

const Rating = mongoose.model("ratings", ratingSchema)
module.exports = Rating