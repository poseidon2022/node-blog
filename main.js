const express = require("express")
const cookieParser = require("cookieparser")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const blogRouter = require("./api/router/blog.router.js")
const commentRouter = require("./api/router/blog.comment.router.js")
const likeRouter = require("./api/router/blog.like.router.js")
const ratingRouter = require("./api/router/blog.rating.router.js")
const userRouter = require("./api/router/user.router.js")
const refreshRouter = require("./api/router/refresh.router.js")

mongoose.connect(process.env.DATABASEURI)
.then(() => {
    console.log("Database Connected")
})
.catch(err => {
    console.error("Database connection failed: ", err.message)
})
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser)

const PORT = process.env.PORT || 3000
app.use("/api/blog", blogRouter)
app.use("/api/blog", commentRouter)
app.use("/api/blog", likeRouter)
app.use("/api/blog", ratingRouter)
app.use("/api/user", userRouter)
app.use("/api/user", refreshRouter)
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})