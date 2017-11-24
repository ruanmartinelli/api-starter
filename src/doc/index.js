/**
 * Declarations for apiDoc creation. (http://apidocjs.com/)
 * Leaving it here until find a better place to put it.
 */

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

/**
 * @api {get} /api/user/:id Get user
 * @apiName  GetUser
 * @apiGroup Users
 * @apiVersion  0.1.0
 *
 * @apiHeader {String} Authorization Auth token
 *
 * @apiParam (Url params) {Number} id The user ID
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 652,
 *       "email": "daenerys@dragonclub.com",
 *       "name": "Daenerys"
 *       "username": "mother_of_dragons14"
 *     }
 *
 */

/**
 * @api {get} /api/user Get users
 * @apiName  GetUsers
 * @apiGroup Users
 * @apiVersion  0.1.0
 *
 * @apiHeader {String} Authorization Auth token
 *
 * @apiParam (Query String params) {String} [email] Find users with given email
 * @apiParam (Query String params) {String} [username] Find users with given username
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *       {
 *         "id": 652,
 *         "email": "daenerys@dragonclub.com",
 *         "name": "Daenerys"
 *         "username": "mother_of_dragons14"
 *       },
 *       {
 *         "id": 129,
 *         "email": "tyrion22@lannister.com",
 *         "name": "Tyrion"
 *         "username": "winelover"
 *       }
 *      ]
 *
 */

/**
 * @api {put} /api/user Update user
 * @apiName UpdateUser
 * @apiGroup Users
 * @apiVersion  0.1.0
 *
 * @apiHeader {String} Authorization Auth token
 *
 * @apiParam (Body) {Number} id ID of the user
 * @apiParam (Body) {String} [email] Email of the User.
 * @apiParam (Body) {String} [name] Name of the User.
 * @apiParam (Body) {String} [username] Username of the User.
 *
 * @apiSuccessExample {type} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *    "id": 652,
 *    "email": "daenerys@dragonclub.com",
 *    "name": "Danny"
 *    "username": "danny_stormborn"
 *   }
 */

/**
 * @api {delete} /api/user/:id Remove user
 * @apiName RemoveUser
 * @apiGroup Users
 * @apiVersion  0.1.0
 *
 * @apiHeader {String} Authorization Auth token
 *
 * @apiParam (Url params) {Number} id ID of the user
 *
 * @apiSuccessExample {type} Success-Response:
 * HTTP/1.1 204 OK
 * {}
 */

/**
 * @api {post} /api/user Add user
 * @apiName AddUser
 * @apiGroup Users
 * @apiVersion  0.1.0
 *
 * @apiParam (Body) {String} email Email of the user.
 * @apiParam (Body) {String} name Name of the user.
 * @apiParam (Body) {String} username Username of the user.
 * @apiParam (Body) {String} password Password of the user.
 *
 * @apiSuccessExample {type} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *    "id": 652,
 *    "email": "daenerys@dragonclub.com",
 *    "name": "Daenerys"
 *    "username": "danny_stormborn"
 *   }
 */
