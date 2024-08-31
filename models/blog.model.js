const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    title : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    tags : {
        type : [String],
        required : true
    },
    average_rating: {
        type: Number,
        default : 0,
        min: 0, 
        max: 5, 
    },
    rating_count : {
        type : Number,
        default : 0
    },
    total_rating : {
        type : Number,
        default : 0
    },
    view_count : {
        type : Number,
        default : 0,
    },
    like_count : {
        type : Number,
        default : 0
    },
    comment_count : {
        type : Number,
        default : 0
    },
    },
    {timestamps : true}
)

const Blog = mongoose.model("blogs", blogSchema)
module.exports = Blog