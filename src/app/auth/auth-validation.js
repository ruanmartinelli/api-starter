const { check } = require('express-validator/check')
const handleValidations = require('../../util/handle-validation')

function login () {
  return [
    check('email')
      .not()
      .isEmpty()
      .withMessage('No email or password!'),
    check('password')
      .exists()
      .withMessage('No email or password'),
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

function resetPassword () {
  return [
    check('pwd', 'Please fill in all the fields').exists(),
    check('pwd2', 'Please fill in all the fields').exists(),
    check('oldpwd', 'Please fill in all the fields').exists(),
    check('pwd', 'Password did not match').custom(
      (password, { req }) => password === req.body.pwd2
    ),
    check('pwd', 'Please enter a password with more than 6 digits').isLength({
      min: 6
    }),
    handleValidations
  ]
}

module.exports = {
  login,
  createAccount,
  resetPassword
}
