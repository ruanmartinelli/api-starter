const _ = require('lodash')
const jwt = require('jsonwebtoken')
const path = require('path')
const scrypt = require('scrypt-for-humans')
const error = require('../../util/error')
const userService = require('../user/user-service')
const emailService = require('../email/email-service')
const emailTemplate = require('../email/email-template')
const resetEmailTemplate = require('../../util/reset-password-template')

const { JWT_EXPIRES_IN, JWT_SECRET, APP_BASE_URL, APP_NAME } = process.env

async function login ({ email, password }) {
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

async function forgotPassword ({ email }) {
  const users = await userService.getUsers({ email })

  if (_.isEmpty(users)) return Promise.resolve()

  const resetToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })

  const resetUrl = path.join(APP_BASE_URL, `reset-form?t=${resetToken}`)

  const { subject, content } = emailTemplate.resetPassword({ resetUrl })

  await emailService.sendEmail({
    to: 'martinelliruan@gmail.com',
    subject,
    content
  })
}

function sendResetForm ({ token, validationText = '' }) {
  try {
    const { email: userEmail } = jwt.verify(token, JWT_SECRET)

    return resetEmailTemplate({ appName: APP_NAME, userEmail, validationText })
  } catch (err) {
    return `<h2>Sorry, the page expired</h2>`
  }
}

async function resetPassword ({ oldPassword, password, password2, token }) {
  if (!password || !password2 || !oldPassword) return error.validation('Please fill in all the fields')
  if (password !== password2) return error.validation('Password did not match')
  if (password.length < 6) return error.validation('Please enter a password with more than 6 digits')

  let decoded

  try {
    decoded = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return error.validation('This session has expired.')
  }
  const { email } = decoded
  const { id } = await userService.getUsers({ email }).then(_.head)
  await userService.updatePassword({ id, newPassword: password })
}

module.exports = { login, forgotPassword, sendResetForm, resetPassword }
