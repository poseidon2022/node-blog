const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
    },
    title : {
        type : String,
    },
    content : {
        type : String,
    },
    author : {
        type : String,
    },
    tags : {
        type : [String],
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