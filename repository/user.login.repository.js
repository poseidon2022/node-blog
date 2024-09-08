const User = require("../models/user.model")
class LoginRepository {
    async Login(email) {
        try {
            const foundUser = await User.find({email})
            return foundUser
        } catch(err) {
            throw new Error("error while fetching user from the Database")
        }
    }
}

module.exports = LoginRepository