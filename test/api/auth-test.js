const { isString, isArray } = require('lodash')
const { user } = require('../helpers/user')
const userService = require('../../src/app/user/user-service')
const faker = require('faker')
const jwt = require('jsonwebtoken')

module.exports = (request, test) => {
  let savedUser = {}
  let _password
  let _email

  test.before(async t => {
    const u = user()
    _password = u.password
    _email = u.email
    savedUser = await userService.addUser(u)
  })

  test('Auth: successful login', async t => {
    const { email } = savedUser

    const response = await request.post(`/login`, {
      email,
      password: _password
    })

    t.is(response.status, 200)
    t.is(isString(response.data.token), true)
    t.is(isString(response.data.name), true)
    t.is(isString(response.data.email), true)
    t.true(savedUser != null)
  })

  test('Auth: no email', async t => {
    const response = await request.post(`/login`, { password: _password })
    t.is(response.status, 422)
  })

  test('Auth: no email', async t => {
    const response = await request.post(`/login`, { email: _email })

    t.is(response.status, 422)
  })

  test('Auth: wrong password', async t => {
    const { email } = savedUser
    const wrongPassword = _password + '>12345<'
    const response = await request.post(`/login`, {
      email,
      password: wrongPassword
    })

    t.is(response.status, 401)
  })

  test('Auth: user does not exist', async t => {
    const nonExistentUser = {
      email: 'llllll.l.l.p@internet.cn',
      password: '&888&88&8'
    }

    const users = await userService.getUsers({ email: nonExistentUser.email })

    t.true(users.length === 0)

    const response = await request.post(`/login`, nonExistentUser)

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

  test('Auth: validate duplicated email when creating account', async t => {
    const email = faker.internet.email()

    // fake users
    const _user = {
      email,
      name: faker.name.findName(),
      password: faker.internet.password()
    }

    const _user2 = {
      email,
      name: faker.name.findName(),
      password: faker.internet.password()
    }

    const responseFirstUser = await request.post(`/new-account`, _user)
    const responseSecondUser = await request.post(`/new-account`, _user2)

    t.is(responseFirstUser.status, 200)
    t.is(responseSecondUser.status, 422)
  })

  test('Auth: validate create account', async t => {
    const response = await request.post(`/new-account`, {
      name: faker.name.findName(),
      password: faker.internet.password()
    })

    t.is(response.status, 422)
  })

  test('Auth: reset password', async t => {
    // create a token to reset email
    const payload = { email: _email }
    const secret = process.env.JWT_SECRET
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })

    const newPassword = 'abc1234'

    const response = await request.post(`/reset`, {
      oldpwd: _password,
      pwd: newPassword,
      pwd2: newPassword,
      t: token
    })

    t.is(response.status, 200)
  })

  test('Auth: forbidden to reset password w/o token', async t => {
    const newPassword = 'abc1234'

    const response = await request.post(`/reset`, {
      oldpwd: _password,
      pwd: newPassword,
      pwd2: newPassword
    })

    t.is(response.status, 403)
    t.true(isString(response.data.message))
    t.false(isString(response.data.success))
  })
}
