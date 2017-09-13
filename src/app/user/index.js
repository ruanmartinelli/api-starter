const userController = require('./user-controller')
const userValidation = require('./user-validation')
const catchErrors = require('../../util/catch-errors')

function init (app) {
  app.get('/api/user/:id',
    catchErrors(userController.getUser))

  app.get('/api/user/', catchErrors(userController.getUsers))

  app.post('/api/user',
    userValidation.addUser(),
    catchErrors(userController.addUser))

  app.put('/api/user', catchErrors(userController.updateUser))

  app.del('/api/user/:id',
    catchErrors(userController.removeUser))
}

module.exports = { init }
