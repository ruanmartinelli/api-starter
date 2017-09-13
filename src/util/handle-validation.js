const error = require('./error')
const { validationResult } = require('express-validator/check')

module.exports = async (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (err) {
    const firstError = err.array().map(vr => vr.msg)[0]
    return next(error.validation(firstError))
  }
}
