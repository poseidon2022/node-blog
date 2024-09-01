const mongoose = require("mongoose")
const Comment = require("../../models/blog.comment.model")
class BlogCommentController {
    constructor(blogCommentUseCase) {
        this.blogCommentUseCase = blogCommentUseCase
    }

    async CreateComment(req, res) {
        const blog_id = req.params.blog_id
        console.log(req.params)
        // TODO : get the user ID from req.user.userid man.
        //for now with a demo user ID 
        const user_id = new mongoose.Types.ObjectId()
        console.log(blog_id)
        const blogObjectID = new mongoose.Types.ObjectId(blog_id)
        const {content} = req.body
        try {
            const newComment = new Comment({
                user_id : user_id,
                blog_id : blogObjectID,
                content : content
            })

            const createdComment = await this.blogCommentUseCase.CreateComment(newComment)
            res.json({message : createdComment})
        }
        catch(err) {
            console.error(err.message)
            res.status(500).json({error : err.message})
        }
    }

    async UpdateComment(req, res) {
        const comment_id = req.params.id
        const objectID = new mongoose.Types.ObjectId(comment_id)
        const {content} = req.body
        try {
            const updatedComment = await this.blogCommentUseCase.UpdateComment(content, objectID)
            res.json({message : updatedComment})
        } catch(err) {
            res.status(500).json({error : "internal server error"})
        }
    }

    async DeleteComment(req, res) {
        const comment_id = req.params.id
        const objectID = new mongoose.Types.ObjectId(comment_id)
        try {
            const deletedComment = await this.blogCommentUseCase.DeleteComment(objectID)
            res.json({message : deletedComment})
        } catch(err) {
            res.status(500).json({error : "internal server error"})
        }
    }

}

module.exports = BlogCommentController