/* eslint handle-callback-err: "off" */
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

function serverError (err, req, res, next) {
  console.log(err)
  res.status(500)
  res.send('Internal server error')
}

module.exports = {
  notFound,
  serverError,
  validationError
}
