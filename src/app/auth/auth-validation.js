const handleValidations = require('../../util/handle-validation')
const { check } = require('express-validator/check')

function login () {
  return [
    check('email').not().isEmpty().withMessage('No email or password!'),
    check('password').exists().withMessage('No email or password'),
    handleValidations
  ]
}

function createAccount () {
  return [
    check('email', 'Please enter email').exists(),
    check('password', 'Please enter password').exists(),
    check('name', 'Please enter name').exists(),
    handleValidations
  ]
}

module.exports = {
  login,
  createAccount
}
