const jwt = require("jsonwebtoken")
require("dotenv").config()
const GenerateRefreshToken = (user) => {
    const refreshToken = jwt.sign({user},process.env.JWT_SECRET, {expiresIn : process.env.REFRESH_EXPIRY})
    return refreshToken
}

module.exports = GenerateRefreshToken