const userService = require('./user-service')

async function getUsers (req, res, next) {
  const users = await userService.getUsers(req.query)

  res.send(users)
}
async function getUser (req, res, next) {
  const { id } = req.params
  const user = await userService.getUser(id)

  res.send(user)
}

async function addUser (req, res, next) {
  const user = await userService.addUser(req.body)
  res.send(user)
}

async function updateUser (req, res, next) {
  const user = await userService.updateUser(req.body)
  res.send(user)
}

async function removeUser (req, res, next) {
  const { id } = req.params
  await userService.removeUser(id)
  res.sendStatus(200)
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser
}
