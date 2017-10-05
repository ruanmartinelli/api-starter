import 'dotenv/config'

import '../src/index.js'
import test from 'ava'
import axios from 'axios'

import { createUser } from './helpers/user'
import userController from 'app/user/user-controller'
import authController from 'app/auth/auth-controller'

test.before(async t => {
  const _user = createUser()
  const { email, password } = _user

  await userController.addUser(_user)

  const { token } = await authController.login({ email, password })

  axios.defaults.baseURL = `http://localhost:${process.env.APP_PORT}/`
  axios.defaults.headers.common['Authorization'] = token

  // Disable axios default option that throws an error for HTTP codes >= 300
  axios.defaults.validateStatus = status => status >= 200 && status < 500
})

require('./api/error-test')(axios, test)
require('./api/user-test')(axios, test)
require('./api/auth-test')(axios, test)
