const request = require('supertest')
const app = require('../')
const test = require('ava')

require('./api/user-test')(request(app), test)
require('./api/user-test')(request(app), test)
require('./api/auth-test')(request(app), test)
