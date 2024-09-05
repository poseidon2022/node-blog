const Rating = require("../../models/blog.rating.model")
const mongoose = require("mongoose")
class BlogRatingController {

    constructor(blogRatingUseCase) {
        this.blogRatingUseCase = blogRatingUseCase
    }

    async InsertRating(req,res) {
        const blog_id = req.params.blog_id
        //TODO : get the user id from req.user.userid
        //for now use a demo id
        const user_id = new mongoose.Types.ObjectId()
        const objectID = new mongoose.Types.ObjectId(blog_id)
        const {rating} = req.body
        try {
            const newRating = new Rating({
                blog_id : objectID,
                user_id : user_id,
                rating : rating
            })
            const insertedRating = await this.blogRatingUseCase.InsertRating(newRating)
            res.json({message : insertedRating})
        } catch(err) {
            console.log(err.message)
            res.status(500).json({error : "internal server error"})
        }
    }

    async UpdateRating(req, res) {
        let rating_id = req.params.id
        rating_id = new mongoose.Types.ObjectId(rating_id)
        const {rating} = req.body
        try {
            const updatedRating = await this.blogRatingUseCase.UpdateRating(rating_id, rating)
            res.json({message : updatedRating})
        } catch(err) {
            if (err.message == "rating not found") {
                res.status(404).json({error : err.message})
                return
            }
            res.status(500).json({error : "internal server error"})
        }
    }

    async DeleteRating(req, res) {
        let rating_id = req.params.id
        rating_id = new mongoose.Types.ObjectId(rating_id)
        try {
            const deletedRating = await this.blogRatingUseCase.DeleteRating(rating_id)
            res.json({message : deletedRating})
        } catch(err) {
            if (err.message == "rating not found") {
                res.status(404).json({error : err.message})
                return
            }
            res.status(500).json({error : "internal server error"})
        }
    }
}

module.exports = BlogRatingController