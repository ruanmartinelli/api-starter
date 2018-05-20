import 'dotenv/config'

import nodemailer from 'nodemailer'
import stubTransport from 'nodemailer-stub-transport'
import { DateTime } from 'luxon'

import { ValidationError } from 'util/error/'
import isEnv from 'util/is-env'

const smtpTransport = {
  host: process.env.SES_HOST,
  port: process.env.SES_PORT,
  secure: false,
  auth: {
    user: process.env.SES_USER,
    pass: process.env.SES_PASSWORD
  }
}

const transport = isEnv('test') ? stubTransport() : smtpTransport

const transporter = nodemailer.createTransport(transport)

export function sendEmail({ to = '', from = '', subject = '', content = '' }) {
  // @CASE: no email was specified, use the address in app_email_sender env var
  if (!from) from = process.env.APP_EMAIL_SENDER

  // prettier-ignore
  if (!to) throw new ValidationError('Error sending email: missing recipient')
  if (!subject)
    throw new ValidationError('Error sending email: missing email subject')

  const date = DateTime.local().toLocaleString(DateTime.DATETIME_FULL)
  console.log(`[${date}] 📧  EMAIL: ${subject} \n[${date}] 📧  TO: ${to}\n`)

  const email = { to, from, subject, html: content }

  return transporter.sendMail(email).catch(err => handleEmailError(err, email))
}

function handleEmailError(err, email) {
  const info = `
  -> Failed sending email.

  from: ${email.from}
  to: ${email.to}
  subject: ${email.subject}
  content: ${email.html}

  ---

  The error was:

  ${err.stack}
  `
  console.log(info)

  // return sendEmail({
  //   to: process.env.APP_EMAIL_SENDER,
  //   subject: `There's been an error sending an email.`,
  //   content
  // })
}
