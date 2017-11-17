import jwt from 'jsonwebtoken'
import error from 'util/error'

/**
 * Middleware to check if the user has proper
 * authorization (access token) to access the API routes
 */
function authMiddleware (req, res, next) {
  const token = req.headers['Authorization'] || req.get('Authorization')

  if (!token) return next(error.forbidden('No token provided'))

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(err)

    // User context is stored on res.locals so things like
    // the user id, email, etc. can be accessed on controllers
    res.locals = decoded

    next()
  })
}

export default authMiddleware
