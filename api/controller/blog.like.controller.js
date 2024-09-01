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

    }
}

module.exports = BlogLikeController