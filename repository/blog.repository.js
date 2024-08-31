const mongoose = require("mongoose")
const Blog = require('../models/blog.model');
class BlogRepository {
    async CreateBlog(newBlog) {
        try {
            await newBlog.save()
            return newBlog
        } catch(err) {
            throw new Error("Error while trying to insert to DB")
        }
    }

    async UpdateBlog(updatedBlog, blog_id) {
        const objectID = new mongoose.Types.ObjectId(blog_id);
        try {
            const updateBlog = await Blog.findByIdAndUpdate(objectID, updatedBlog, { new: true });  
            if (!updateBlog) {
                throw new Error('Blog not found');
            }
            return updateBlog;
        } catch (err) {
            throw new Error('Error while trying to update on DB');
        }
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