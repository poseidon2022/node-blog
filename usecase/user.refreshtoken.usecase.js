class RefreshTokenUseCase {
    constructor(refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository
    }

    async RefreshAcccessToken(user_email) {
        try {
            const refreshToken = await this.refreshTokenRepository.RefreshAcccessToken(user_email)
            return refreshToken
        } catch(err) {
            throw new Error(err.message)
        }   
    }
}

module.exports = RefreshTokenUseCase