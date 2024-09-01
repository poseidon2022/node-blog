class BlogCommentUseCase {
    constructor(blogCommentRepository, blogRepository) {
        this.blogCommentRepository = blogCommentRepository
        this.blogRepository = blogRepository
    }

    async CreateComment(newComment) {
        try {
            const createdComment = await this.blogCommentRepository.CreateComment(newComment)
            await this.blogRepository.UpdateCommentCount(createdComment.blog_id, true)
            return createdComment
        } catch(error) {
            throw new Error("error while creating comment")
        }
    }

    async UpdateComment(content, comment_id) {
        

    }

    async DeleteComment(commentID) {

    }
}

module.exports = BlogCommentUseCase