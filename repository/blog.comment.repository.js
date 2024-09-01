const Comment = require("../models/blog.comment.model")
class BlogCommentRepository {

    async CreateComment(newComment) {
        try {
            await newComment.save()
            return newComment
        }
        catch(err) {
            console.error(err.message)
            throw new Error("error while adding blog to DB")
        }

    }

    async UpdateComment(content, comment_id) {
        try {
            const updatedComment = await Comment.findOneAndUpdate(comment_id, {$set : {content : content}})
            return updatedComment
        } catch(err) {
            console.error(err.message)
            throw new Error("Error while updating comment on DB")
        }
    }

    async DeleteComment(commentID) {
        try {
            const deletedComment = await Comment.findOneAndDelete(commentID)
            return deletedComment
        } catch(err) {
            console.error(err.message)
            throw new Error("Error while deleting comment on DB")
        }
    }

}

module.exports = BlogCommentRepository