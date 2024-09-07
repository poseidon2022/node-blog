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
    
   async GetAllBlogs(limit, page) {
        try {
            const offset = (page - 1) * limit
            const allBlogs = await Blog.find().skip(offset).limit(limit)
            const totalDocuments = await Blog.countDocuments({})
            const totalPages = Math.ceil(totalDocuments / limit)
            const currentPage = (offset / limit) + 1
            const paginationMetaData = {
                total_documents : totalDocuments,
                total_pages : totalPages,
                current_page : currentPage
            }

            allBlogs.paginationMetaData = paginationMetaData
            const finalResult = {
                blogs : allBlogs,
                meta_data : paginationMetaData
            }
            return finalResult

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

    async FilterBlog(tags, likeLowerRange, viewLowerRange) {
        try {
            const filter = {}
            filter.like_count = {$gt : likeLowerRange}
            filter.view_count = {$gt : viewLowerRange}
            if (tags.length > 0) {
                const tagFilters = tags.map(tag  => (
                    {tags : {$elemMatch : {$regex : new RegExp(tag, 'i')}}}
                ))

                console.log(tagFilters)
                filter.$and = tagFilters
            }

            console.log(filter)
            const foundBlog = await Blog.find(filter)
            if (!foundBlog) {
                throw new Error("No blogs found")
            }

            return foundBlog
        } catch(err) {
            console.error(err)
            throw new Error(err.message)
        }
    }

    async SearchBlog(title, author) {
        try {
            let foundBlog = {}
            console.log(title)
            if (title && author) {
                foundBlog = await Blog.find({$or : [{title : {$regex : new RegExp(title, 'i')}}, {author : {$regex : new RegExp(author, 'i')}}]})
            } else if (!title && author) {
                foundBlog = await Blog.find({author : {$regex : new RegExp(author, 'i')}})
            } else {
                foundBlog = await Blog.find({title : {$regex : new RegExp(title, 'i')}})
            }
            if (!foundBlog) {
                throw new Error("No blogs found")
            }
            return foundBlog
        } catch(err) {
            console.error(err.message)
            throw new Error(err.message)
        }
    }

    async InsertRating(insertedRating) {
        try {
            let updatedBlog = await Blog.findByIdAndUpdate(insertedRating.blog_id, 
                {$inc : {total_rating : insertedRating.rating, 
                rating_count : 1}})
            const updatedAverageRating = parseFloat(((updatedBlog.total_rating + insertedRating.rating)  / (updatedBlog.rating_count + 1)).toFixed(1))
            updatedBlog = await Blog.findByIdAndUpdate(insertedRating.blog_id, {$set : {average_rating : updatedAverageRating}})
        } catch(err) {
            console.error("error while updating rating on DB")
            throw new Error("error while updating rating on DB")
        }
    }

    async UpdateRating(rating, prevRating) {
        try {
            let prevBlog = await Blog.findByIdAndUpdate(prevRating.blog_id, {$inc : {total_rating : rating - prevRating.rating}})
            const updatedAverageRating = parseFloat(((prevBlog.total_rating + rating - prevRating.rating)  / prevBlog.rating_count).toFixed(1))
            prevBlog = await Blog.findByIdAndUpdate(prevRating.blog_id, {$set : {average_rating : updatedAverageRating}})
        } catch(err) {
            console.error(err.message)
            throw new Error("error while updating rating on DB")
        }
    }


    async DeleteRating(deletedRating) {
        try {
            let prevBlog = await Blog.findByIdAndUpdate(deletedRating.blog_id, {$inc : {total_rating : -1 * deletedRating.rating, rating_count : -1}})
            if (prevBlog.rating_count - 1 == 0) {
                await Blog.findByIdAndUpdate(deletedRating.blog_id, {$set : {average_rating : 0}})
                return
            }
            const average_rating = parseFloat(((prevBlog.total_rating - deletedRating.rating)  / (prevBlog.rating_count - 1)).toFixed(1))
            await Blog.findByIdAndUpdate(deletedRating.blog_id, {$set : {average_rating : average_rating}})
        } catch(err) {
            console.error(err.message)
            throw new Error("error while deleting on DB")
        }
    }
}

module.exports = BlogRepository