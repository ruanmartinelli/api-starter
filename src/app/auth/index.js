import http from 'util/http'
import authController from './auth-controller'

function initPublic (app) {
  /**
   * @api {post} /login Login
   * @apiName Login
   * @apiGroup Auth
   * @apiVersion  0.1.0
   *
   * @apiParam (Body) {String} email Email of the user.
   * @apiParam (Body) {String} password Password of the user.
   *
   * @apiSuccessExample {type} Success-Response:
   * HTTP/1.1 200 OK
   *  {
   *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
   *    "name": "Hodor",
   *    "email": "hodor@hodor.com"
   *  }
   */
  app.post('/login', http(authController.login))
}

export default { initPublic }
