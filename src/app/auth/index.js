const authController = require('./auth-controller')
const authValidation = require('./auth-validation')
const catchErrors = require('../../util/catch-errors')

function init (app) {
  app.post('/login',
    catchErrors(authValidation.login),
    catchErrors(authController.login))
}

module.exports = { init }
