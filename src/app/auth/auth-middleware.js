const jwt = require('jsonwebtoken')

async function authMiddleware (req, res, next) {
  const token = req.headers['x-app-token'] || req.get('x-app-token')

  if (!token) return next(new Error('No token provided'))

  jwt.verify(token, process.ENV.JWT_SECRET, (err, decoded) => {
    if (err) return next(err)

    res.locals = {}

    next()
  })
}

module.exports = authMiddleware
