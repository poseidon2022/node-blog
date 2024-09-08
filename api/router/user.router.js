const OtpController = require("../controller/user.createotp.controller")
const OtpUseCase = require("../../usecase/user.createotp.usecase")
const OtpRepository = require("../../repository/user.createotp.repository")

const router = require("express").Router()

const otpRepository = new OtpRepository()
const otpUseCase = new OtpUseCase(otpRepository)
const otpController = new OtpController(otpUseCase)

router.post("/generate-otp", (req,res) => otpController.CreateOtp(req, res))

module.exports = router