// const authMiddleware = require('./auth/auth-middleware')

function init (app) {
  // aliasing
  app.del = app.delete

  app.get('/', (req, res) => res.send(`<h1> server running </h1>`))

  require('./auth').init(app)
  // app.use(authMiddleware)
  require('./user').init(app)
}

module.exports = { init }
