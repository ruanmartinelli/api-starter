const authService = require('./auth-service')

async function login (req, res, next) {
  const result = await authService.login(req.body)

  res.send(result)
}

async function forgotPassword (req, res, next) {
  await authService.forgotPassword(req.body)

  res.sendStatus(200)
}

async function sendResetForm (req, res, next) {
  const { t: token } = req.query
  const result = authService.sendResetForm({ token })
  res.send(result)
}

async function resetPassword (req, res, next) {
  const { oldpwd: oldPassword, pwd: password, pwd2: password2, t: token } = req.body
  await authService.resetPassword({ oldPassword, password, password2, token })
  res.sendStatus(200)
}

module.exports = { login, forgotPassword, sendResetForm, resetPassword }
