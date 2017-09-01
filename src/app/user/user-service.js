const scrypt = require('scrypt-for-humans')
const userModel = require('./user-model')

async function addUser (user) {
  user.password = await scrypt.hash(user.password)

  return userModel.addUser(user)
}

async function updatePassword ({ id, newPassword }) {
  const hash = await scrypt.hash(newPassword)

  return userModel.updateUser({
    id, password: hash
  })
}

module.exports.addUser = addUser
module.exports.updatePassword = updatePassword

module.exports.getUsers = userModel.getUsers
module.exports.getUser = userModel.getUser
module.exports.updateUser = userModel.updateUser
module.exports.removeUser = userModel.removeUser
