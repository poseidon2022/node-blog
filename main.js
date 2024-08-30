const express = require("express")
const cors = require("cors")
const blogRouter = require("./api/router/blog.router.js")

const app = express()
app.use(cors())

const PORT = process.env.PORT || 3000
app.use("/api/blog", blogRouter)
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})