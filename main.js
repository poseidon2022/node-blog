const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const blogRouter = require("./api/router/blog.router.js")
const commentRouter = require("./api/router/blog.comment.router.js")

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

const PORT = process.env.PORT || 3000
app.use("/api/blog", blogRouter)
app.use("/api/blog", commentRouter)
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})