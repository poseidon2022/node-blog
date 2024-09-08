const jwt = require("jsonwebtoken")
require("dotenv").config()
const GenerateAccessToken = (user) => {
    const accessToken = jwt.sign({user},process.env.JWT_SECRET, {expiresIn : process.env.ACCESS_EXPIRY})
    return accessToken
}

module.exports = GenerateAccessToken