import user from './user'
import auth from './auth'
import http from 'util/http'
import authMiddleware from '../middleware/auth'
import requireRole from '../middleware/require-role'

const api = {
  /**
   * Initializes API routes.
   * @param {object} app express instance
   */
  init(app) {
    app.del = app.delete

    app.post('/login', http(auth.login))

    app.use(authMiddleware)

    app.get('/api/user/:id', requireRole('admin'), http(user.read))
    app.get('/api/user/', requireRole('admin'), http(user.browse))
    app.post('/api/user', requireRole('admin'), http(user.add))
    app.put('/api/user/:id', requireRole('admin'), http(user.edit))
    app.del('/api/user/:id', requireRole('admin'), http(user.destroy))
  }
}

export default api
