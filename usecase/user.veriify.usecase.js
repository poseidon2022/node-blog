class SignupUseCase {
    constructor(signupRepository) {
        this.signupRepository = signupRepository
    }
    
    async Signup(name, email, password, otp) {
        try {
            const createdUser = await this.signupRepository.Signup(name, email, password, otp)
            return createdUser
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

module.exports = SignupUseCase