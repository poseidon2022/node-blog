const Refresh = require("../models/refresh.model")
class RefreshTokenRepository {
    async RefreshAccessToken(email) {
        try {
            const refreshTokenInfo = await Refresh.find({email}).sort({created_at : -1}).limit(1)
            return refreshTokenInfo
        } catch(err) {
            throw new Error("error while fetching refresh token info")
        }
    }
}

module.exports = RefreshTokenRepository