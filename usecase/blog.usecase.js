class BlogUseCase {
    constructor(blogRepository) {
        this.blogRepository = blogRepository
    }
    
    async CreateBlog(newBlog) {
        try {
            const createdBlog = await this.blogRepository.CreateBlog(newBlog)
            return createdBlog
        } catch(err) {
            throw new Error("Error while trying to create blog")
        }
    }

    async UpdateBlog(updatedBlog, blog_id) {

        try {
            const updateBlog = await this.blogRepository.UpdateBlog(updatedBlog, blog_id)
            return updateBlog
        } catch(err) {
            console.log(err)
            throw new Error("Error while updating blog")
        }

    }

    async DeleteBlog(blog_id) {
        try {
            const deleteBlog = await this.blogRepository.DeleteBlog(blog_id)
            return deleteBlog
        } catch(err) {
            console.log(err)
            throw new Error("Error while deleting blog")
        }
    }

    GetAllBlogs() {

    }

    GetBlogByID(blogID)  {

    }


    FilterBlog(tags, likeLowerRange, viewLowerRange, date) {

    }

    SearchBlog(title, author) {

    }
}

module.exports = BlogUseCase