const Otp = require("../models/otp.model")
const User = require("../models/user.model")
class SignupRepository {
    async Signup(name, email, password, otp) {
        try {
            if (await User.find({email})) {
                throw new Error("user with the specified email already exists")
            }

            const storedOtp = Otp.find({email}).sort({created_at : -1}).limit(1)
            if (storedOtp != otp) {
                throw new Error("invalid otp")
            }

            const createdUser = await User.create({name, email, password, otp})
            return createdUser

        } catch(err) {
            console.log(err.message)
            throw new Error(err.message)
        }
    }
}


module.exports = SignupRepository