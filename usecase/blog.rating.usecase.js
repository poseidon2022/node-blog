class BlogRatingUseCase {
    constructor(blogRepository, blogRatingRepository) {
        this.blogRepository = blogRepository
        this.blogRatingRepository = blogRatingRepository
    }

    async InsertRating(newRating) {

    }

    async UpdateRating(rating_id, rating) {

    }

    async DeleteRating(rating_id) {

    }
}

module.exports = BlogRatingUseCase