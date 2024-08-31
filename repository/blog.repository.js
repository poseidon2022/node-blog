class BlogRepository {
    async CreateBlog(newBlog) {
        await newBlog.save()
        return newBlog
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

module.exports = BlogRepository