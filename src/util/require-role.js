const { toUpper } = require('lodash')

function requireRole (role) {
  return (req, res, next) => {
    if (res.locals.role && toUpper(res.locals.role) === toUpper(role)) {
      next()
    } else {
      res.send(403)
    }
  }
}
module.exports = requireRole
