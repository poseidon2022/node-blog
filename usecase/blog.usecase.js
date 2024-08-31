const Blog = require("../domain/domain")
class BlogUseCase {
    constructor(blogRepository) {
        this.blogRepository = blogRepository
    }
    
    CreateBlog(title, content, tags) {

    }

    UpdateBlog(title, content, tags) {

    }

    GetAllBlogs() {

    }

    GetBlogByID(blogID)  {

    }

    DeleteBlog(blogID, userID, role) {

    }

    FilterBlog(tags, likeLowerRange, viewLowerRange, date) {

    }

    SearchBlog(title, author) {

    }
}

module.exports = BlogUseCase