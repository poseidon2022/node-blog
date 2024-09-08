class OtpUseCase {
    constructor(otpRepository) {
        this.otpRepository = otpRepository
    }

    async CreateOtp(otp, email) {
        try {
            const createdOtp = await this.otpRepository.CreateOtp(otp, email)
            return createdOtp
        } catch(err) {
            throw new Error("error while creating Otp")
        }
    }
}

module.exports = OtpUseCase