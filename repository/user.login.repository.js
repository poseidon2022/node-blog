const User = require("../models/user.model")
const Refresh = require("../models/refresh.model")
class LoginRepository {
    async Login(email) {
        try {
            const foundUser = await User.findOne({email})
            return foundUser
        } catch(err) {
            throw new Error("error while fetching user from the Database")
        }
    }

    async RefreshToken(email, refresh_token) {
        try {
            await Refresh.create({email, refresh_token})
        } catch(err) {
            throw new Error("error while storing refresh token to Database")
        }
    }
}

module.exports = LoginRepository