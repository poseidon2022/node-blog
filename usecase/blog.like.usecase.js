class BlogLikeUseCase {
    constructor(blogLikeRepository, blogRepository) {
        this.blogLikeRepository = blogLikeRepository
        this.blogRepository = blogRepository
    }

    async LikeBlog(newLike) {
        try {
            const createdLike = await this.blogLikeRepository.LikeBlog(newLike)
            await this.blogRepository.UpdateLikeCount(newLike.blog_id, true)
            return createdLike
        } catch(err) {
            throw new Error("error while creating like")
        }

    }

    async UnlikeBlog(like_id) {
        try {
            const unliked = await this.blogLikeRepository.UnlikeBlog(like_id)
            await this.blogRepository.UpdateLikeCount(unliked.blog_id, false)
            return unliked
        } catch(err) {
            throw new Error("error while deleting like")
        }
    }

    async GetByID(user_id, blog_id) {
        try {
            const foundLikes = await this.blogLikeRepository.GetByID(user_id, blog_id)
            await this.blogLikeRepository.GetByID(user_id, blog_id)
            return foundLikes
        } catch(err) {
            console.log(err.message)
            throw new Error(err.message)
        }
    }
}

module.exports = BlogLikeUseCase