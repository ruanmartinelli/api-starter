import 'dotenv/config'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import scrypt from 'scrypt-for-humans'
import { UnauthorizedError } from 'util/error'
import User from 'model/user'

const { JWT_EXPIRES_IN, JWT_SECRET } = process.env

const auth = {
  /**
   * Login using email.
   * @param {{email, password}} options
   * @return {object} object with JWT token
   */
  async login({ email, password }) {
    const [user] = await User.find({ email })

    if (!user) throw new UnauthorizedError('User not found')

    const { password: userPassword } = await User.findPassword(user.id)

    // Verify password
    try {
      await scrypt.verifyHash(password, userPassword)
    } catch (err) {
      throw new UnauthorizedError('Wrong password')
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }

    // Create JWT token
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    })

    return { token, email, name: user.name }
  }
}

export default auth
