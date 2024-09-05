const express = require("express")
const router = express.Router()
const BlogRepository = require("../../repository/blog.repository")
const BlogUseCase = require("../../usecase/blog.usecase")
const BlogController = require("../controller/blog.controller")

const blogRepository = new BlogRepository()
const blogUseCase = new BlogUseCase(blogRepository)
const blogController = new BlogController(blogUseCase)

router.post("/create", (req, res) => blogController.CreateBlog(req, res))
router.patch("/update/:blog_id", (req, res) => blogController.UpdateBlog(req, res))
router.delete("/delete/:blog_id", (req, res) => blogController.DeleteBlog(req, res))
router.get("/getblog/:blog_id", (req, res) => blogController.GetBlogByID(req, res))
router.get("/getblogs", (req,res) => blogController.GetAllBlogs(req, res))
router.get("/search", (req, res) => blogController.SearchBlog(req, res))

module.exports = router