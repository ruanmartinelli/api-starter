/* eslint handle-callback-err: "off" */
const { bgBlue, blue } = require('chalk')

function notFound (req, res, next) {
  res.status(404)

  res.send({
    status: 404, success: false, message: 'Route not found'
  })
}

function validationError (err, req, res, next) {
  if (!err.status || err.status !== 422) return next(err)

  res.status(422)
  res.send(err)
}

function unauthorizedError (err, req, res, next) {
  if (!err.status || err.status !== 401) return next(err)

  res.status(401)
  res.send(err)
}

function forbiddenError (err, req, res, next) {
  if (!err.status || err.status !== 403) return next(err)

  res.status(403)
  res.send(err)
}

function serverError (err, req, res, next) {
  console.log(`
  ${blue('✖️  ✖️  ✖️  Something went wrong:  ✖️  ✖️  ✖️')}

  ${bgBlue(JSON.stringify(err))}

  ${blue('✖️  ✖️  ✖️')}
  `)

  res.status(500)
  res.send('Internal server error')
}

module.exports = {
  notFound,
  serverError,
  forbiddenError,
  validationError,
  unauthorizedError
}
