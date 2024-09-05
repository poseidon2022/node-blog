const Rating = require("../models/blog.rating.model")
class BlogRatingRepository {

    async InsertRating(newRating) {
        try {
            await newRating.save()
            return newRating
        } catch(err) {
            console.error(err.message)
            throw new Error("error while inserting rating to DB")
        }

    }

    async UpdateRating(rating_id, rating) {
        try {
            const prevRating = await Rating.findByIdAndUpdate(rating_id, {$set : {rating : rating}})
            if (!prevRating) {
                throw new Error("rating not found")
            }
            return prevRating
        } catch(err) {
            throw new Error(err.message)
        }

    }

    async DeleteRating(rating_id) {
        try {
            const deletedRating = await Rating.findByIdAndDelete(rating_id)
            return deletedRating
        } catch(err) {
            console.error(err.message)
            throw new Error("error while deleting rating from DB")
        }
        
    }
}

module.exports = BlogRatingRepository