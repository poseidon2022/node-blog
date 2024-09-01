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
        try {
            const updatedComment = await this.blogCommentRepository.UpdateComment(content, comment_id)
            return updatedComment
        } catch(error) {
            throw new Error("error while updating comment")
        }
    }

    async DeleteComment(commentID) {
        try {
            const deletedComment = await this.blogCommentRepository.DeleteComment(commentID)
            return deletedComment
        } catch(error) {
            throw new Error("error while deleting comment")
        }
    }
}

module.exports = BlogCommentUseCase