const authController = require('./auth-controller')
const authValidation = require('./auth-validation')
const catchErrors = require('../../util/catch-errors')

function init (app) {
  app.post('/login',
    catchErrors(authValidation.login),
    catchErrors(authController.login))

  app.post('/forgot', catchErrors(authController.forgotPassword))
  app.get('/reset-form', catchErrors(authController.sendResetForm))
  app.post('/reset', catchErrors(authController.resetPassword))
}

module.exports = { init }
