import authRoutes from './auth'
import userRoutes from './user'
import authMiddleware from './auth/auth-middleware'

function init (app) {
  // Alias delete with del
  app.del = app.delete

  authRoutes.initPublic(app)
  userRoutes.initPublic(app)

  // Routes below this middleware shoud be
  // prefixed with "/api/" and require an access token
  app.use(authMiddleware)

  userRoutes.initPrivate(app)
}

module.exports = { init }
