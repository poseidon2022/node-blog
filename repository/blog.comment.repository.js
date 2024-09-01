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

    async UpdateComment(editedComment) {

    }

    async DeleteComment(commentID) {
        
    }

}

module.exports = BlogCommentRepository