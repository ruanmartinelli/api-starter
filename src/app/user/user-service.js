const scrypt = require('scrypt-for-humans')
const error = require('../../util/error')
const userModel = require('./user-model')

async function addUser (user) {
  if (!user.email) return error.validation('Please enter a valid email address')
  if (!user.password) return error.validation('Please enter a valid password')

  user.password = await scrypt.hash(user.password)

  return userModel.addUser(user)
}

module.exports.addUser = addUser

module.exports.getUsers = userModel.getUsers
module.exports.getUser = userModel.getUser
module.exports.updateUser = userModel.updateUser
module.exports.removeUser = userModel.removeUser
