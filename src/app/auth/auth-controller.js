const authService = require('./auth-service')

async function login (req, res, next) {
  const result = await authService.login(req.body)

  res.send(result)
}

module.exports = { login }
