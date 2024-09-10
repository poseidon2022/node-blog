const RefreshTokenController = require("../controller/user.refreshtoken.controller")
const RefreshTokenUseCase = require("../../usecase/user.refreshtoken.usecase")
const RefreshTokenRepository = require("../../repository/user.refreshToken.repository")
const router = require("express").Router()


const refreshTokenRepository = new RefreshTokenRepository()
const refreshTokenUseCase = new RefreshTokenUseCase(refreshTokenRepository)
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)

router.get("/refresh", (req, res) => refreshTokenController.RefreshAccessToken(req, res))

module.exports = router

