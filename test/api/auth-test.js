const { isString, isArray } = require('lodash')
const { user } = require('../helpers/user')
const userService = require('../../src/app/user/user-service')
const faker = require('faker')

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
      .post(`/login`,
      { email, password: _password })

    t.is(response.status, 200)
    t.is(isString(response.data.token), true)
    t.is(isString(response.data.name), true)
    t.is(isString(response.data.email), true)
    t.true(savedUser != null)
  })

  test('Auth: no email', async t => {
    const response = await request
      .post(`/login`, { password: _password })

    t.is(response.status, 422)
  })

  test('Auth: wrong password', async t => {
    const { email } = savedUser
    const wrongPassword = _password + '>12345<'
    const response = await request
      .post(`/login`, { email, password: wrongPassword })

    t.is(response.status, 401)
  })

  test('Auth: user does not exist', async t => {
    const nonExistentUser = { email: 'llllll.l.l.p@internet.cn', password: '&888&88&8' }

    const users = await userService.getUsers({ email: nonExistentUser.email })

    t.true(users.length === 0)

    const response = await request
      .post(`/login`, nonExistentUser)

    t.is(response.status, 401)
  })

  test('Auth: create account', async t => {
    // fake user
    const _user = {
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: faker.internet.password()
    }

    // save
    const response = await request.post(`/new-account`, _user)

    // get saved user from db
    const saved = await userService.getUsers({
      email: _user.email
    })

    t.true(isArray(saved))
    t.is(saved[0].email, _user.email)
    t.true(saved[0].password !== _user.password)
    t.is(response.status, 200)
  })

  test('Auth: validate create account', async t => {
    const response = await request.post(`/new-account`, {
      name: faker.name.findName(),
      password: faker.internet.password()
    })

    t.is(response.status, 422)
  })
}
