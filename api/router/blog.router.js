const express = require("express")
const router = express.Router()
const BlogRepository = require("../../repository/blog.repository")
const BlogUseCase = require("../../usecase/blog.usecase")
const BlogController = require("../controller/blog.controller")
const authenticate = require("../utils/createMiddlewareInstance")

router.use(authenticate)

const blogRepository = new BlogRepository()
const blogUseCase = new BlogUseCase(blogRepository)
const blogController = new BlogController(blogUseCase)


router.post("/", (req, res) => blogController.CreateBlog(req, res))
router.patch("/:blog_id", (req, res) => blogController.UpdateBlog(req, res))
router.delete("/:blog_id", (req, res) => blogController.DeleteBlog(req, res))
router.get("/:blog_id", (req, res) => blogController.GetBlogByID(req, res))
router.get("/", (req,res) => blogController.GetAllBlogs(req, res))
router.get("/search", (req, res) => blogController.SearchBlog(req, res))
router.get("/filter", (req, res) => blogController.FilterBlog(req, res))

module.exports = router