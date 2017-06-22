const _ = require('lodash')
const qb = require('../../db')
const table = 'users'

async function getUsers (filter) {
  return qb.select().from(table).where(filter)
}

function getUser (id) {
  return getUsers({ id }).then(_.head)
}

async function addUser (user) {
  const id = await qb(table).insert(user).then(_.head)

  return getUsers({ id }).then(_.head)
}

async function updateUser ({ id, name, email }) {
  const user = { id, name, email }

  await qb(table).update(user).where(`${table}.id`, id)

  return getUsers({ id }).then(_.head)
}

async function removeUser (id) {
  return qb(table).where(`${table}.id`, id).del()
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser
}
