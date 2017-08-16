const scrypt = require('scrypt-for-humans')
const userModel = require('./user-model')

async function addUser (user) {
  user.password = await scrypt.hash(user.password)

  return userModel.addUser(user)
}

module.exports.addUser = addUser

module.exports.getUsers = userModel.getUsers
module.exports.getUser = userModel.getUser
module.exports.updateUser = userModel.updateUser
module.exports.removeUser = userModel.removeUser
