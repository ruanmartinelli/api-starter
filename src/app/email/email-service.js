const error = require('../../util/error')
const moment = require('moment')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SES_HOST,
  port: process.env.SES_PORT,
  secure: false,
  auth: {
    user: process.env.SES_USER,
    pass: process.env.SES_PASSWORD
  }
})

function sendEmail ({ to, from, subject, content }) {
  if (!to || !from || !subject) return error.validation('Error sending email')

  const date = moment().format('MM/DD hh:mm:ss')

  console.log(`[${date}] 📧  EMAIL: ${subject} \n[${date}] 📧  TO: ${to}\n`)

  return transporter.sendMail({ to, from, subject, html: content })
}

module.exports = {
  sendEmail
}
