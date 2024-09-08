const OtpController = require("../controller/user.createotp.controller")
const OtpUseCase = require("../../usecase/user.createotp.usecase")
const OtpRepository = require("../../repository/user.createotp.repository")
const SignupController = require("../controller/user.verify.controller")
const SignupUseCase = require("../../usecase/user.veriify.usecase")
const SignupRepository = require("../../repository/user.verify.repository")

const LoginController = require("../controller/user.login.controller")
const LoginUseCase = require("../../usecase/user.login.usecase")
const LoginRepository = require("../../repository/user.login.repository")

const router = require("express").Router()

const otpRepository = new OtpRepository()
const otpUseCase = new OtpUseCase(otpRepository)
const otpController = new OtpController(otpUseCase)

const signupRepository = new SignupRepository()
const signupUseCase = new SignupUseCase(signupRepository)
const signupController = new SignupController(signupUseCase)

const loginRepository = new LoginRepository()
const loginUseCase = new LoginUseCase(loginRepository)
const loginController = new LoginController(loginUseCase)

router.post("/generate-otp", (req,res) => otpController.CreateOtp(req, res))
router.post("/signup", (req, res) => signupController.Signup(req, res))
router.post("/login", (req,res) => loginController.Login(req, res))

module.exports = router