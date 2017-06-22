const _ = require('lodash')
const scrypt = require('scrypt-for-humans')
const userModel = require('../user/user-model')

async function login (req, res, next) {
  const { email, password } = req.body

  if (!email || !password) throw new Error('No email or password')

  const user = await userModel.getUsers({ email }).then(_.head)

  if (!user) throw new Error('User not found')

  await scrypt.verifyHash(password, user.password)

  res.send({})
}

module.exports = { login }
