import 'dotenv/config'

import '../src/index.js'
import test from 'ava'
import axios from 'axios'

import auth from 'api/auth'

test.before(async t => {
  const { token } = await auth.login({
    email: 'danny.stormborn@gmail.com',
    password: 'abc'
  })

  axios.defaults.baseURL = `http://localhost:${process.env.APP_PORT}/`
  axios.defaults.headers.common['Authorization'] = token
  axios.defaults.validateStatus = status => true
})

test.todo('.')

Promise.all([
  import('./api/user-test'),
  import('./api/auth-test'),
  import('./api/error-test')
]).then(fns => {
  fns.map(fn => fn.default(axios, test))
})
