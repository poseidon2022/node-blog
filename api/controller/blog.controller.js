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

    async UpdateBlog(req, res) {
        //blog id is retreived from params and used to update a blog with the appropriate body
        const blog_id = req.params["blog_id"]
        try {
            const userID = new mongoose.Types.ObjectId()
            const {title, author, content, tags} = req.body
            const updateBlog = new Blog({
                title : title,
                content : content,
                author : author,
                tags : tags
            })
            const updatedBlog = await this.blogUseCase.UpdateBlog(updateBlog, blog_id)
            res.json({message : updatedBlog})
        }
        catch(err) {
            res.status(500).json({message : err.message})
        }
    }

    async DeleteBlog(req, res) {
        const blog_id = req.params["blog_id"]

        try {
            const deletedBlog = await this.blogUseCase.DeleteBlog(blog_id)
            res.json({message : deletedBlog})
        }
        catch(err) {
            res.status(500).json({message : err.message})
        }
    }

    GetAllBlogs(req, res) {

    }

    GetBlogByID(req, res)  {

    }

    FilterBlog(req, res) {

    }

    SearchBlog(req, res) {

    }

}

module.exports = BlogController