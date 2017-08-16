const error = require('../../util/error')

async function addUser (req, res, next) {
  req.checkBody('email', 'No email or password').notEmpty()
  req.checkBody('email', 'Please enter a valid email').isEmail()
  req.checkBody('password', 'No email or password').notEmpty()

  const validationResult = await req.getValidationResult()

  if (validationResult.isEmpty()) return next()

  const errors = validationResult.array().map(vr => vr.msg)

  return error.validation(errors[0])
}

module.exports = {
  addUser
}
