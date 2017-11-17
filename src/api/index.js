import user from './user'
import auth from './auth'
import http from 'util/http'
import authMiddleware from '../middleware/auth'

const api = {

  /**
   * Initializes API routes.
   * @param {object} app express instance
   */
  init(app) {
    app.del = app.delete

    app.post('/login', http(auth.login))

    app.use(authMiddleware)

    app.get('/api/user/:id', http(user.read))
    app.get('/api/user/', http(user.browse))
    app.post('/api/user', http(user.add))
    app.put('/api/user/:id', http(user.edit))
    app.del('/api/user/:id', http(user.destroy))
  }
}

export default api
