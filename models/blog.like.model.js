const mongoose = require("mongoose")
const  likeSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    blog_id : {
        type : mongoose.Types.ObjectId,
        required : true
    },
}, {timestamps : true})

const Like = mongoose.model("Likes", likeSchema)
module.exports = Like
