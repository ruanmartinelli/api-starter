const authService = require('./auth-service')

async function login (req, res, next) {
  // const { JWT_EXPIRES_IN, JWT_SECRET } = process.env
  // const { email, password } = req.body

  // if (!email || !password) return error.unauthorized('No email or password')

  // const user = await userModel.getUsers({ email }).then(_.head)

  // if (!user) return error.unauthorized('User not found')

  // try {
  //   await scrypt.verifyHash(password, user.password)
  // } catch (err) {
  //   return error.unauthorized('Wrong password')
  // }

  // const payload = {
  //   name: user.name,
  //   email: user.email,
  //   role: user.role
  // }

  // const token = jwt.sign(payload, JWT_SECRET, {
  //   expiresIn: JWT_EXPIRES_IN
  // })

  const result = await authService.login(req.body)

  res.send(result)
}

module.exports = { login }
