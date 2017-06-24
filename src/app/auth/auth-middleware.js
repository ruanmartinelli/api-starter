const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
  const token = req.headers['x-app-token'] || req.get('x-app-token')

  const forbiddenError = { message: 'No token provided', status: 403, success: false }

  if (!token) return next(forbiddenError)

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(err)

    res.locals = decoded

    next()
  })
}

module.exports = authMiddleware
