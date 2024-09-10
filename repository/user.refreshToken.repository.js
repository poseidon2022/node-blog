const Refresh = require("../models/refresh.model")
class RefreshTokenRepository {
    async RefreshAccessToken(user_email) {
        try {
            const refreshTokenInfo = await Refresh.find({email})
            return refreshTokenInfo
        } catch(err) {
            throw new Error("error while fetching refresh token info")
        }
    }
}

module.exports = RefreshTokenRepository