import { UnauthorizedError } from 'util/error'

export default function requireRole(role = '') {
  return function(req, res, next) {
    if (
      res.locals &&
      res.locals.role &&
      res.locals.role.toUpperCase() === role.toUpperCase()
    ) {
      return next()
    }

    const message = `Sorry, you don't have access to perform this action.`

    next(new UnauthorizedError(message))
  }
}
