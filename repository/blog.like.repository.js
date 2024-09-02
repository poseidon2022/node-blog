const Like = require("../models/blog.like.model")
class BlogLikeRepository {
    async LikeBlog(newLike) {
        try {
            await newLike.save()
            return newLike
        } catch(err) {
            console.error(err.message)
            throw new Error("error while creating like on DB")
        }
    }

    async UnlikeBlog(like_id) {
        try {
            const unliked = await Like.findByIdAndDelete(like_id)
            return unliked
        } catch(err) {
            console.error(err.message)
            throw new Error("error while deleting like on DB")
        }
    }

    async GetByID(user_id, blog_id) {
        try {
            const foundLike = await Like.find({user_id : user_id, blog_id : blog_id})
            if (!foundLike) {
                throw new Error("Like not found")
            }
            return foundLike
        } catch(err) {
            console.error(err.message)
            throw new Error(err.message)
        }
    }
}

module.exports = BlogLikeRepository