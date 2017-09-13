const handleValidations = require('../../util/handle-validation')
const { check } = require('express-validator/check')

function addUser () {
  return [
    check('email', 'No email or password').exists(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'No email or password').exists(),
    handleValidations
  ]
}

module.exports = {
  addUser
}
