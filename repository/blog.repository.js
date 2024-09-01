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

    async DeleteBlog(blog_id) {
        const objectID = new mongoose.Types.ObjectId(blog_id);
        try {
            const deleteBlog = await Blog.findByIdAndDelete(objectID);  
            if (!deleteBlog) {
                throw new Error('Blog not found');
            }
            return deleteBlog;
        } catch (err) {
            console.log(err)
            throw new Error('Error while trying to delete on DB');
        }
    }

    async GetBlogByID(blog_id)  {
        const objectID = new mongoose.Types.ObjectId(blog_id)

        try {
            const returnedBlog = await Blog.findById(objectID)
            if (!returnedBlog) {
                throw new Error("Blog not found")

            }

            return returnedBlog
        } catch(err) {
            throw new Error(err.message)
        }

    }
    
   async GetAllBlogs() {
        try {
            const allBlogs = await Blog.find()
            return allBlogs

        } catch(err) {
            console.error(err.message)
            throw new Error("Error while getting blogs from DB")
        }
    }

    async UpdateCommentCount(blog_id, increment) {
        try {
            if (increment) {
                await Blog.findByIdAndUpdate(blog_id, {$inc : {comment_count : 1}})
            } else {
                await Blog.findByIdAndUpdate(blog_id, {$inc : {comment_count : -1}})
            }
        } catch(err) {
            console.error(err)
            throw new Error("error while updating comment count")
        }

    }

    async UpdateLikeCount(blog_id, increment) {
        try {
            if (increment) {
                await Blog.findByIdAndUpdate(blog_id, {$inc : {like_count : 1}})
            } else {
                await Blog.findByIdAndUpdate(blog_id, {$inc : {like_count : -1}})
            }
        } catch(err) {
            console.error(err)
            throw new Error("error while updating like count")
        }

    }

    FilterBlog(tags, likeLowerRange, viewLowerRange, date) {

    }

    SearchBlog(title, author) {
        
    }
}

module.exports = BlogRepository