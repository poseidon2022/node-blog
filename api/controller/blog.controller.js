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

    async GetBlogByID(req, res)  {
        const blog_id = req.params["blog_id"]

        try {
            const returnedBlog = await this.blogUseCase.GetBlogByID(blog_id)
            res.json({message : returnedBlog})
        }
        catch(err) {
            if (err.message == "Blog not found") {
                res.status(404).json({error : err.message})
                return
            }
            res.status(500).json({error : err.message})
        }
    }


    //let us implement pagination without the paginate v2 library
    async GetAllBlogs(req, res) {
        const limit = parseInt(req.query.limit, 10) || 10
        const page = parseInt(req.query.page, 10) || 1

        if (page <= 0 || limit <= 0) {
            res.status(400).json({error : "page or limit patams invalid"})
        }
        try {
            const allBlogs = await this.blogUseCase.GetAllBlogs(limit, page) 
            res.json({message : allBlogs})
        }
        catch(err) {
            console.error(err)
            res.status(500).json("error while fetching blogs")
        }

    }

    async FilterBlog(req, res) {
        //tags, like_lower_range, view_lower_range
        let {tags, like_lower_range, view_lower_range} = req.body
        tags = tags || []
        like_lower_range = like_lower_range || 0
        view_lower_range = view_lower_range || 0
        try {
            const foundBlog = await this.blogUseCase.FilterBlog(tags, like_lower_range, view_lower_range)
            res.status(200).json({message : foundBlog})
            
        } catch(err) {
            if (err.message == "No blogs found") {
                res.status(204).json({message : err.message})
            }
            res.status(500).json({message : "internal server error"})
        }
    }

    async SearchBlog(req, res) {
        const author = req.query.author
        const title = req.query.title
        try {
            if (author == "" && title == "") {
                res.status(400).json({message : "invalid request format"})
            }
            const foundBlog = await this.blogUseCase.SearchBlog(title, author)
            res.status(200).json({message : foundBlog})
            
        } catch(err) {
            if (err.message == "No blogs found") {
                res.status(204).json({message : err.message})
            }
            res.status(500).json({message : "internal server error"})
        }
    }

}

module.exports = BlogController