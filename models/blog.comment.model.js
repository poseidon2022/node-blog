const mongoose = require("mongoose")
const  commentSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    blog_id : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    content : {
        type : String,
        required : true,
    }
}, {timestamps : true})

const Comment = mongoose.model("comments", commentSchema)
module.exports = Comment
