const authController = require('./auth-controller')
const authValidation = require('./auth-validation')
const catchErrors = require('../../util/catch-errors')

function initPublic (app) {
  app.post('/login',
    authValidation.login(),
    catchErrors(authController.login)
  )

  app.post('/forgot', catchErrors(authController.forgotPassword))

  app.get('/reset-form', catchErrors(authController.sendResetForm))

  app.post('/reset',
    authValidation.resetPassword(),
    catchErrors(authController.resetPassword))

  app.post('/new-account',
    authValidation.createAccount(),
    catchErrors(authController.createAccount)
  )
}

module.exports = { initPublic }
