const _ = require('lodash')
const jwt = require('jsonwebtoken')
const scrypt = require('scrypt-for-humans')
const userService = require('../user/user-service')
const error = require('../../util/error')

async function login ({ email, password }) {
  const { JWT_EXPIRES_IN, JWT_SECRET } = process.env

  if (!email || !password) return error.unauthorized('No email or password')

  const user = await userService.getUsers({ email }).then(_.head)

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

  return { token, email, name: user.name }
}

module.exports = { login }
