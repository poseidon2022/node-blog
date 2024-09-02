const mongoose = require("mongoose")
const Like = require("../../models/blog.like.model")
class BlogLikeController {
    constructor(blogLikeUseCase) {
        this.blogLikeUseCase = blogLikeUseCase
    }

    async LikeBlog(req, res) {
        //TODO : get the userID from req.user.userID
        //for now do it using a demo userID
        const user_id = new mongoose.Types.ObjectId()
        const blog_id = req.params.blog_id
        const objectID = new mongoose.Types.ObjectId(blog_id)
        try {
            const newLike = new Like({
                user_id : user_id,
                blog_id : objectID
            })
            const createdLike = await this.blogLikeUseCase.LikeBlog(newLike)
            res.status(200).json({message : createdLike})
        } catch(err) {
            res.status(500).json({error : "internal server error"})
        }
    }

    async UnlikeBlog(req, res) {
        const like_id = req.params.id
        try {
            const unliked = await this.blogLikeUseCase.UnlikeBlog(like_id)
            res.status(200).json({message : unliked})
        } catch(err) {
            res.status(500).json({error : "intenal server error"})
        }
    }

    async GetByID(req, res) {
        //TODO : get the userID from req.user.userID
        //for now do it using a demo userID
        const user_id = new mongoose.Types.ObjectId("66d4fab5b98e8d6d4d7f9080")
        const blog_id = req.params.blog_id
        const objectID = new mongoose.Types.ObjectId(blog_id)
        try {
            const foundLike = await this.blogLikeUseCase.GetByID(user_id, blog_id)
            res.status(200).json({message : foundLike})
        } catch(err) {
            if (err.message == "Like not found") {
                res.status(404).json({error : err.message})
                return
            }
            res.status(500).json({error : "internal server error"})
        }
    }
}

module.exports = BlogLikeController