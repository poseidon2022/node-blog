const BlogCommentController = require("../controller/blog.comment.controller")
const BlogCommentUseCase = require("../../usecase/blog.comment.usecase")
const BlogCommentRepository = require("../../repository/blog.comment.repository")
const BlogRepository = require("../../repository/blog.repository")
const express = require("express")

const router = express.Router()


const blogCommentRepository = new BlogCommentRepository()
const blogRepository = new BlogRepository()
const blogCommentUseCase = new BlogCommentUseCase(blogCommentRepository, blogRepository)
const blogCommentController = new BlogCommentController(blogCommentUseCase)

router.post("/:blog_id/comment/", (req, res) => blogCommentController.CreateComment(req, res))
router.patch("/:blog_id/comment/:id", (req, res) => blogCommentController.UpdateComment(req, res))
router.delete("/:blog_id/comment/:id", (req, res) =>  blogCommentController.DeleteComment(req, res))

module.exports = router

