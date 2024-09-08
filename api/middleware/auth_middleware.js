require("dotenv").config()
const jwt = require("jsonwebtoken")
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({
            success : false,
            message : "access token not provided"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(err) {
        res.status(400).json({
            success : false,
            message : "invalid access token"
        })
    }
}

module.exports = authenticate