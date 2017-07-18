const authMiddleware = require('./auth/auth-middleware')

function init (app) {
  // aliasing
  app.del = app.delete

  require('./auth').init(app)

  app.use(authMiddleware)

  require('./user').init(app)
}

module.exports = { init }
