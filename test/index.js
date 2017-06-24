const app = require('../')
const test = require('ava')
const axios = require('axios')
const authService = require('../src/app/auth/auth-service')
const userService = require('../src/app/user/user-service')
const { user } = require('./helpers/user')

test.before(async t => {
  app.listen()

  const _user = user()
  const { email, password } = _user

  await userService.addUser(_user)

  const { token } = await authService.login({ email, password })

  axios.defaults.baseURL = 'http://localhost:9910/'
  axios.defaults.headers.common['x-app-token'] = token
  axios.defaults.validateStatus = (status) => (status >= 200 && status < 500)
})

// import test modules below
require('./api/error-test')(axios, test)
require('./api/user-test')(axios, test)
require('./api/auth-test')(axios, test)
