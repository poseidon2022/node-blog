const BlogLikeController = require("../controller/blog.like.controller")
const BlogLikeUseCase = require("../../usecase/blog.like.usecase")
const BlogLikeRepository = require("../../repository/blog.like.repository")
const BlogRepository = require("../../repository/blog.repository")
const express = require("express")
const authenticate = require("../utils/createMiddlewareInstance")

const router = express.Router()
router.use(authenticate)


const blogLikeRepository = new BlogLikeRepository()
const blogRepository = new BlogRepository()
const blogLikeUseCase = new BlogLikeUseCase(blogLikeRepository, blogRepository)
const blogLikeController = new BlogLikeController(blogLikeUseCase)

router.post("/:blog_id/like/", (req, res) => blogLikeController.LikeBlog(req, res))
router.delete("/like/:id", (req, res) => blogLikeController.UnlikeBlog(req, res))
router.get("/:blog_id/like/", (req, res) =>  blogLikeController.GetByID(req, res))

module.exports = router

