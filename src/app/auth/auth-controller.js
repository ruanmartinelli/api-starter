const authService = require('./auth-service')

async function login (req, res, next) {
  const result = await authService.login(req.body)

  res.send(result)
}

async function forgotPassword (req, res, next) {
  await authService.forgotPassword(req.body)

  res.sendStatus(200)
}

module.exports = { login, forgotPassword }
