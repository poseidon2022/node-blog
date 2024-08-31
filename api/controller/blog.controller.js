const Blog = require("../../models/blog.model")
const mongoose = require("mongoose")
class BlogController {
    constructor(blogUseCase) {
        this.blogUseCase = blogUseCase
    }

    async CreateBlog(req, res) {
        // TODO : userID from req.user.useriD
        // for now just set the user id to be some arbitrary primitive object ID
        console.log(req.body)
        try {
            const userID = new mongoose.Types.ObjectId()
            const {title, author, content, tags} = req.body
            const newBlog = new Blog({
                user_id : userID,
                title : title,
                content : content,
                author : author,
                tags : tags
            })
            const createdBlog = await this.blogUseCase.CreateBlog(newBlog)
            res.json({message : createdBlog})
        }
        catch(err) {
            res.status(500).json({message : err.message})
        }
    }

    UpdateBlog(req, res) {

    }

    GetAllBlogs(req, res) {

    }

    GetBlogByID(req, res)  {

    }

    DeleteBlog(req, res) {

    }

    FilterBlog(req, res) {

    }

    SearchBlog(req, res) {

    }

}

module.exports = BlogController