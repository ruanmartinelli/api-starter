const { isArray, isObject, isUndefined } = require('lodash')
const { user, admin } = require('../helpers/user')
const userService = require('../../src/app/user/user-service')

module.exports = (request, test) => {
  let savedUser = {}
  let savedAdmin = {}

  test.before(async t => {
    savedUser = await userService.addUser(user())
    savedAdmin = await userService.addUser(admin())
  })

  test('Users: get all', async t => {
    const response = await request.get('/api/user')
    const users = response.data
    const userIds = users.map(user => user.id)

    t.is(response.status, 200)
    t.is(userIds.includes(savedAdmin.id), true)
    t.is(userIds.includes(savedUser.id), true)
    t.is(isArray(users), true)
  })

  test('Users: get one', async t => {
    const response = await request.get(`/api/user/${savedUser.id}`)

    t.is(response.status, 200)
    t.is(isObject(response.data), true)
  })

  test('Users: add new', async t => {
    const newUser = user()
    const response = await request.post(`/api/user/`, newUser)
    const saved = response.data

    t.is(response.status, 200)
    t.is(isObject(saved), true)
    t.true(newUser.password !== saved.password)
  })

  test('Users: update user', async t => {
    savedUser.name = 'James Doe'

    const response = await request.put(`/api/user/`, savedUser)
    const updated = response.data

    t.is(response.status, 200)
    t.is(isObject(updated), true)
    t.is(updated.name, 'James Doe')
  })

  test('Users: get a non-existing user returns undefined', async t => {
    const newUser = user()
    const { id } = await userService.addUser(newUser)
    const response = await request.delete(`/api/user/${id}`)
    const saved = await userService.getUser(id)

    t.is(response.status, 200)
    t.is(isUndefined(saved), true)
  })

  test('Users: fail if no email provided', async t => {
    let newUser = user()
    delete newUser.email
    const response = await request.post(`/api/user/`, newUser)

    t.is(response.status, 422)
  })
}
