const express = require("express")
const BlogRepository = require("../../repository/blog.repository")
const BlogRatingRepository = require("../../repository/blog.rating.repository")
const BlogRatingUseCase = require("../../usecase/blog.rating.usecase")
const BlogRatingController = require("../controller/blog.rating.controller")
const authenticate = require("../utils/createMiddlewareInstance")

const router = express.Router()
router.use(authenticate)
const blogRepository = new BlogRepository()
const blogRatingRepository = new BlogRatingRepository()
const blogRatingUseCase = new BlogRatingUseCase(blogRepository, blogRatingRepository)
const blogRatingController = new BlogRatingController(blogRatingUseCase)

router.post("/:blog_id/rating/", (req, res) => blogRatingController.InsertRating(req, res))
router.patch("/rating/:id", (req, res) => blogRatingController.UpdateRating(req,res))
router.delete("/rating/:id", (req,res) => blogRatingController.DeleteRating(req, res))

module.exports = router
