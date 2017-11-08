import { isEmpty } from 'lodash'
import scrypt from 'scrypt-for-humans'

import error from 'util/error'
import User from 'model/user'

function getUsers({ id, email }) {
  return User.find({ id, email })
}

function getUser({ id }) {
  return User.findById(id)
}

async function addUser(user, options) {
  const { email } = user
  const savedUser = await User.find({ email })

  if (!isEmpty(savedUser)) {
    throw error.validation('User already exists')
  }

  // Hashes user password
  user.password = await scrypt.hash(user.password)

  return User.create(user)
}

function updateUser(user, { id }) {
  return User.update(user)
}

function removeUser({ id }) {
  return User.remove(id)
}

export default {
  getUser,
  addUser,
  getUsers,
  updateUser,
  removeUser
}
