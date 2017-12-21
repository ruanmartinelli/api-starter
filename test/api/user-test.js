import { isObjectLike, isArray, isNil } from 'lodash'
import user from 'api/user'
import auth from 'api/auth'
import { user as createUser, admin } from '../helpers'

const resource = 'user'
const path = '/api/user'

export default (request, test) => {
  const context = {}

  test.before(async t => {
    context.user = await user.add(createUser())
    context.admin = await user.add(admin())

    const { token } = await auth.login({
      email: context.admin.email,
      password: '123'
    })

    context.adminOpts = {
      headers: {
        Authorization: token
      }
    }
  })

  test(`GET ${path}/`, async t => {
    const res = await request.get(`${path}`, context.adminOpts)

    t.is(res.status, 200)
    t.true(isArray(res.data))
  })

  test(`GET ${path}/:id`, async t => {
    const res = await request.get(
      `${path}/${context.user.id}`,
      context.adminOpts
    )

    t.is(res.status, 200)
    t.true(isObjectLike(res.data))
    t.is(res.data.id, context.user.id)
    t.true(!res.data.password) // should not expose password hash
  })

  test(`POST ${path}`, async t => {
    const _user = createUser()
    const res = await request.post(`${path}`, _user, context.adminOpts)

    t.is(res.status, 200)
    t.is(isObjectLike(res.data), true)
    t.is(res.data.email, _user.email)
  })

  test(`POST ${path} - fail if adding an existing user`, async t => {
    const res = await request.post(`${path}`, context.user, context.adminOpts)

    t.is(res.status, 422)
  })

  test(`PUT ${path}/:id`, async t => {
    const _user = Object.assign(context.user, { username: 'anotherusername' })
    const res = await request.put(
      `${path}/${context.user.id}`,
      _user,
      context.adminOpts
    )

    t.is(res.status, 200)
  })

  test(`PUT ${path}/:id - fail if user is invalid`, async t => {
    const _user = Object.assign({}, context.user)
    delete _user.username
    const res = await request.put(
      `${path}/${context.user.id}`,
      _user,
      context.adminOpts
    )

    t.is(res.status, 422)
  })

  test(`DELETE ${path} - fail if user is not an admin`, async t => {
    const saved = await user.add(createUser())
    const res = await request.delete(`${path}/${saved.id}`)

    t.is(res.status, 401)
  })

  test(`DELETE ${path}`, async t => {
    const saved = await user.add(createUser())
    const res = await request.delete(`${path}/${saved.id}`, context.adminOpts)

    t.is(res.status, 204)
  })

}
