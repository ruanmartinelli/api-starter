import 'dotenv/config'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import scrypt from 'scrypt-for-humans'
import error from 'util/error'
import userController from 'app/user/user-controller'

const { JWT_EXPIRES_IN, JWT_SECRET } = process.env

async function login ({ email, password }) {
  const user = await userController.getUsers({ email }).then(_.head)

  if (!user) throw error.unauthorized('User not found')

  // Verify password
  try {
    await scrypt.verifyHash(password, user.password)
  } catch (err) {
    throw error.unauthorized('Wrong password')
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email
  }

  // Create JWT token
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  })

  return { token, email, name: user.name }
}

export default { login }
