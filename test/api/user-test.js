import { isObjectLike, isArray, isNil } from 'lodash'
import user from 'api/user'
import { user as createUser, admin } from '../helpers'

const resource = 'user'
const path = '/api/user'

export default (request, test) => {
  const context = {}

  test.before(async t => {
    context.user = await user.add(createUser())
    context.admin = await user.add(admin())
  })

  test(`GET ${path}/`, async t => {
    const res = await request.get(`${path}`)

    t.is(res.status, 200)
    t.true(isArray(res.data))
  })

  test(`GET ${path}/:id`, async t => {
    const res = await request.get(`${path}/${context.user.id}`)

    t.is(res.status, 200)
    t.true(isObjectLike(res.data))
    t.is(res.data.id, context.user.id)
  })

  // test('Users: add new user', async t => {
  //   const user = createUser()
  //   // prettier-ignore
  //   const { data: saved, status } = await request.post(`/api/user/`, user)

  //   t.is(status, 200)
  //   t.is(isObject(saved), true)
  //   t.is(saved.email, user.email)
  //   t.is(saved.username, user.username)
  // })

  // test('Users: add existing user', async t => {
  //   const user = _user
  //   const { status } = await request.post(`/api/user/`, user)

  //   t.is(status, 422)
  // })

  // test('Users: update existing user', async t => {
  //   const user = Object.assign(_user, { username: 'NedStark11' })
  //   // prettier-ignore
  //   const { data: updated, status } = await request.put(`/api/user/${user.id}`, user)

  //   t.is(status, 200)
  //   t.is(isObject(updated), true)
  //   t.is(updated.email, user.email)
  //   t.is(updated.username, 'NedStark11')
  // })

  // test('Users: update invalid user returns 422', async t => {
  //   const user = Object.assign({}, _user)
  //   delete user.username
  //   const { data, status } = await request.put(`/api/user/${user.id}`, user)

  //   t.is(status, 422)
  //   t.is(data.success, false)
  // })

  // // test('Users: get all users', async t => {
  // //   const { data: users, status } = await request.get(`/api/user/`)

  // //   t.is(status, 200)
  // //   t.is(isArray(users), true)
  // //   // Make sure the user is present
  // //   t.is(users.filter(u => u.id === _user.id).length, 1)
  // // })

  // test('Users: get a existing user', async t => {
  //   const { id } = _user
  //   const { data: user, status } = await request.get(`/api/user/${id}`)

  //   t.is(status, 200)
  //   t.is(isObject(user), true)
  //   t.is(user.id, id)
  // })

  // test('Users: removes a user', async t => {
  //   // Adds a user
  //   const { data: savedUser } = await request.post(`/api/user/`, createUser())
  //   // Deletes it
  //   const { status } = await request.delete(`/api/user/${savedUser.id}`)
  //   // Tries to fetch the deleted user
  //   const { data: user } = await request.get(`/api/user/${savedUser.id}`)

  //   t.is(status, 204)
  //   t.is(isEmpty(user), true)
  // })
}
