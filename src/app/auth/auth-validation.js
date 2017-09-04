const error = require('../../util/error')

async function login (req, res, next) {
  req.checkBody('email', 'No email or password').notEmpty()
  req.checkBody('password', 'No email or password').notEmpty()

  const validationResult = await req.getValidationResult()

  if (validationResult.isEmpty()) return next()

  const errors = validationResult.array().map(vr => vr.msg)

  // TODO: return an array of errors instead of the first
  return error.validation(errors[0])
}

async function createAccount (req, res, next) {
  req.checkBody('email', 'Please enter email').notEmpty()
  req.checkBody('password', 'Please enter password').notEmpty()
  req.checkBody('name', 'Please enter name').notEmpty()

  const validationResult = await req.getValidationResult()

  if (validationResult.isEmpty()) return next()

  const errors = validationResult.array().map(vr => vr.msg)

  return error.validation(errors[0])
}

module.exports = {
  login,
  createAccount
}
