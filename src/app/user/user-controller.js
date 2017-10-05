import { isEmpty } from 'lodash'
import scrypt from 'scrypt-for-humans'

import error from 'util/error'
import userModel from './user-model'

function getUsers ({ id, email }) {
  return userModel.getUsers({ id, email })
}

function getUser ({ id }) {
  return userModel.getUser(id)
}

async function addUser (user, options) {
  const { email } = user
  const savedUser = await userModel.getUsers({ email })

  if (!isEmpty(savedUser)) {
    throw error.validation('User already exists')
  }

  // Hashes user password
  user.password = await scrypt.hash(user.password)

  return userModel.addUser(user)
}

function updateUser (user, options) {
  if (!user.id) {
    throw error.validation('No ID provided')
  }

  return userModel.updateUser(user)
}

function removeUser ({ id }) {
  return userModel.removeUser(id)
}

export default {
  getUser,
  addUser,
  getUsers,
  updateUser,
  removeUser
}
