const AuthenticationMiddleWare = require("../middleware/auth_middleware")
const LoginRepository = require("../../repository/user.login.repository")

const loginRepository = new LoginRepository()
const authenticationMiddleWare = new AuthenticationMiddleWare(loginRepository)

module.exports = authenticationMiddleWare.authenticate