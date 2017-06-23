const _ = require('lodash')
const jwt = require('jsonwebtoken')
const scrypt = require('scrypt-for-humans')
const userModel = require('../user/user-model')
const error = require('../../util/error')

async function login (req, res, next) {
  const { JWT_EXPIRES_IN, JWT_SECRET } = process.env
  const { email, password } = req.body

  if (!email || !password) return error.unauthorized('No email or password')

  const user = await userModel.getUsers({ email }).then(_.head)

  if (!user) return error.unauthorized('User not found')

  try {
    await scrypt.verifyHash(password, user.password)
  } catch (err) {
    return error.unauthorized('Wrong password')
  }

  const payload = {
    name: user.name,
    email: user.email,
    role: user.role
  }

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  })

  res.send({ token, email, name: user.name })
}

module.exports = { login }
