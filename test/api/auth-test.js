const { isString } = require('lodash')
const { user } = require('../helpers/user')
const userService = require('../../src/app/user/user-service')

module.exports = (request, test) => {
  let savedUser = {}
  let _password

  test.before(async t => {
    const u = user()
    _password = u.password
    savedUser = await userService.addUser(u)
  })

  test('Auth: successful login', async t => {
    const { email } = savedUser

    const response = await request
      .post(`/login`)
      .send({ email, password: _password })

    t.is(response.status, 200)
    t.is(isString(response.body.token), true)
    t.is(isString(response.body.name), true)
    t.is(isString(response.body.email), true)
    t.true(savedUser != null)
  })

  test('Auth: no email', async t => {
    const response = await request
      .post(`/login`)
      .send({ password: _password })

    t.is(response.status, 401)
  })

  test('Auth: wrong password', async t => {
    const { email } = savedUser
    const wrongPassword = _password + '>12345<'
    const response = await request
      .post(`/login`)
      .send({ email, password: wrongPassword })

    t.is(response.status, 401)
  })

  test('Auth: user does not exist', async t => {
    const nonExistentUser = { email: 'llllll.l.l.p@internet.cn', password: '&888&88&8' }

    // we have to check if it really does not exist, right ¯\_(ツ)_/¯
    const users = await userService.getUsers({ email: nonExistentUser.email })

    t.true(users.length === 0)

    const response = await request
      .post(`/login`)
      .send(nonExistentUser)

    t.is(response.status, 401)
  })
}
