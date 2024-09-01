const BlogCommentController = require("../controller/blog.comment.controller")
const BlogCommentUseCase = require("../../usecase/blog.comment.usecase")
const BlogCommentRepository = require("../../repository/blog.comment.repository")
const express = require("express")

const router = express.Router()


const blogCommentRepository = new BlogCommentRepository()
const blogCommentUseCase = new BlogCommentUseCase(blogCommentRepository)
const blogCommentController = new BlogCommentController(blogCommentUseCase)

router.post("/", (req, res) => blogCommentController.CreateComment(req, res))
router.patch("/:id", (req, res) => blogCommentController.UpdateComment(req, res))
router.delete("/:id", (req, res) =>  blogCommentController.DeleteComment(req, res))

module.exports = router

