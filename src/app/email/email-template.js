const { APP_NAME } = process.env

function resetPassword ({ resetUrl }) {
  const subject = `${APP_NAME} - Password reset request`
  const content = `
  <p>We received a request to change your password.
  <p>Visit the following link to continue:
  <br/>
  <a href="${resetUrl}">Reset my password</a>
  <p>If it wasn't you, please ignore this email.`

  return { content, subject }
}

module.exports = {
  resetPassword
}
