const authController = require('./auth-controller')
const catchErrors = require('../../util/catch-errors')

function init (app) {
  app.post('/login', catchErrors(authController.login))
}

module.exports = { init }
