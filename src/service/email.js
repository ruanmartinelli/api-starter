import 'dotenv/config'
import { ValidationError } from 'util/error/'
import nodemailer from 'nodemailer'
import { DateTime } from 'luxon'

const transporter = nodemailer.createTransport({
  host: process.env.SES_HOST,
  port: process.env.SES_PORT,
  secure: false,
  auth: {
    user: process.env.SES_USER,
    pass: process.env.SES_PASSWORD
  }
})

export function send({ to = '', from = '', subject = '', content = '' }) {
  // @CASE: no email was specified, use the address in app_email_sender env var
  if (!from) from = process.env.APP_EMAIL_SENDER

  // prettier-ignore
  if (!to) throw new ValidationError('Error sending email: missing recipient')
  if (!subject) throw new ValidationError('Error sending email: missing email subject')

  const date = DateTime.local().toLocaleString(DateTime.DATETIME_FULL)

  console.log(`[${date}] 📧  EMAIL: ${subject} \n[${date}] 📧  TO: ${to}\n`)

  return transporter.sendMail({ to, from, subject, html: content })
}
