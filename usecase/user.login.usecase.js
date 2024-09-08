class LoginUseCase {
    constructor(loginRepository) {
        this.loginRepository = loginRepository
    }

    async Login(email) {
        try {
            const foundUser = await this.loginRepository.Login(email)
            return foundUser
        } catch(err) {
            throw new Error(err.message)
        }
    }

    async RefreshToken(email, refresh_token) {
        try {
            await this.loginRepository.RefreshToken(email, refresh_token)
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

module.exports = LoginUseCase