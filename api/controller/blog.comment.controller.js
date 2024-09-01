class BlogCommentController {
    constructor(blogCommentUseCase) {
        this.blogCommentUseCase = blogCommentUseCase
    }

    async CreateComment(req, res) {
        const blog_id = req.params["blog_id"]
        try {
            
        }
        catch(err) {

        }
    }

    async UpdateComment(req, res) {

    }

    async DeleteComment(req, res) {
        
    }

}

module.exports = BlogCommentController