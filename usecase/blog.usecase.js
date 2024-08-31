class BlogUseCase {
    constructor(blogRepository) {
        this.blogRepository = blogRepository
    }
    
    async CreateBlog(newBlog) {
        const createdBlog = await this.blogRepository.CreateBlog(newBlog)
        return createdBlog
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