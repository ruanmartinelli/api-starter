import 'dotenv/config'
import { sendEmail } from 'service/email'

export default (request, test) => {
  test('[Services] Email: should send emails', async t => {
    const promise = sendEmail({
      to: process.env.APP_EMAIL_SENDER,
      subject: `${new Date().toLocaleString()} Test email`,
      content: '<h1> Test works </h1>'
    })

    await t.notThrows(promise)
  })

}
