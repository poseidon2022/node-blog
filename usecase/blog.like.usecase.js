class BlogLikeUseCase {
    constructor(blogRepository, blogLikeRepository) {
        this.blogLikeRepository = blogLikeRepository
        this.blogRepository = blogRepository
    }

    async LikeBlog(newLike) {

    }

    async UnlikeBlog(like_id) {

    }

    async GetByID(user_id, blog_id) {

    }
}

module.exports = BlogLikeUseCase