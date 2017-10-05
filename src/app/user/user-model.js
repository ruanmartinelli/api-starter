import { head } from 'lodash'
import Joi from 'joi'

import qb from 'db' // qb stands for query builder
import validateSchema from 'util/validate-schema'

const table = 'user'

// prettier-ignore
const UserSchema = Joi.object({
  id: Joi.number().integer(),
  email: Joi.string().email().max(255).required(),
  name: Joi.string().max(255).required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().max(255).required()
})

function getUsers (filter) {
  const columns = ['id', 'email', 'name', 'username', 'password']

  const query = qb
    .select(columns)
    .from(table)

  if (filter.id) query.where('id', filter.id)
  if (filter.email) query.where('email', filter.email)
  if (filter.username) query.where('username', filter.username)

  return query
}

function getUser (id) {
  return getUsers({ id }).then(users => head(users) || {})
}

async function addUser (user) {
  user = validateSchema(user, UserSchema)

  const id = await qb(table)
    .insert(user)
    .then(head)

  return getUsers({ id }).then(head)
}

async function updateUser (user) {
  user = validateSchema(user, UserSchema)

  const { id } = user

  await qb(table)
    .update(user)
    .where(`${table}.id`, id)

  return getUsers({ id }).then(head)
}

function removeUser (id) {
  return qb(table)
    .where(`${table}.id`, id)
    .del()
}

export default {
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser
}
