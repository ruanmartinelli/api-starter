import { isNil } from 'lodash'

import { createUser } from '../helpers/user'
import userController from 'app/user/user-controller'

module.exports = (request, test) => {
  let _user = {}
  let _password = {}

  test.before(async t => {
    const newUser = createUser()
    _password = newUser.password
    _user = await userController.addUser(newUser)
  })

  test('Auth: successful login', async t => {
    const credentials = {
      email: _user.email,
      password: _password
    }

    const { data, status } = await request.post(`/login`, credentials)

    t.is(status, 200)
    t.is(isNil(data.token), false)
    t.is(isNil(data.email), false)
    t.is(isNil(data.name), false)
  })

  test('Auth: bad password', async t => {
    const credentials = {
      email: _user.email,
      password: _password + `abc`
    }
    const { status } = await request.post(`/login`, credentials)

    t.is(status, 401)
  })

  test('Auth: user does not exist', async t => {
    const credentials = {
      email: `doesnotexist${_user.email}`,
      password: _password
    }
    const { status } = await request.post(`/login`, credentials)

    t.is(status, 401)
  })
}
