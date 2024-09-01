const mongoose = require("mongoose")
const Comment = require("../../models/blog.comment.model")
class BlogCommentController {
    constructor(blogCommentUseCase) {
        this.blogCommentUseCase = blogCommentUseCase
    }

    async CreateComment(req, res) {
        const blog_id = req.params["blog_id"]
        // TODO : get the user ID from req.user.userid man.
        //for now with a demo user ID 
        const user_id = mongoose.Types.ObjectId()
        const {content} = req.body
        try {
            const newComment = new Comment({
                user_id : user_id,
                blog_id : blog_id,
                content : content
            })

            const createdComment = await blogCommentUseCase.createdComment(createdComment)
            res.json({message : createdComment})
        }
        catch(err) {
            console.error(err.message)
            res.status(500).json({error : err.message})
        }
    }

    async UpdateComment(req, res) {

    }

    async DeleteComment(req, res) {
        
    }

}

module.exports = BlogCommentController