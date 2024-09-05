class BlogRatingUseCase {
    constructor(blogRepository, blogRatingRepository) {
        this.blogRepository = blogRepository
        this.blogRatingRepository = blogRatingRepository
    }

    async InsertRating(newRating) {
        try {
            const insertedRating = await this.blogRatingRepository.InsertRating(newRating)
            await this.blogRepository.InsertRating(insertedRating)
            return insertedRating
        } catch(err) {
            throw new Error("error while trying to rate")
        }
    }

    async UpdateRating(rating_id, rating) {
        try {
            const prevRating = await this.blogRatingRepository.UpdateRating(rating_id, rating)
            await this.blogRepository.UpdateRating(rating, prevRating)
        } catch(err) {
            if (err.message == "rating not found") {
                throw new Error(err.message)
            }
            throw new Error("error whule updating rating")
        }

    }

    async DeleteRating(rating_id) {
        try {
            const deletedRating = await this.blogRatingRepository.DeleteRating(rating_id)
            await this.blogRepository.DeleteRating(deletedRating)
            return deletedRating
        } catch(err) {
            throw new Error("error while deletting rating")
        }

    }
}

module.exports = BlogRatingUseCase