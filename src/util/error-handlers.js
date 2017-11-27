import { bgBlue, blue } from 'chalk'

function notFound(req, res, next) {
  res.status(404)

  res.send({
    status: 404,
    success: false,
    message: 'Resource not found'
  })
}

function validationError(err, req, res, next) {
  let { status, message } = err

  if (!message) message = 'Validation Error'

  if (!status || status !== 422) {
    return next(err)
  } else {
    res.status(status)
    res.send({ status, message, success: false })
  }
}

function unauthorizedError(err, req, res, next) {
  let { status, message } = err

  if (!message) message = 'Unauthorized'

  if (!status || status !== 401) {
    return next(err)
  } else {
    res.status(status)
    res.send({ status, message, success: false })
  }
}

function forbiddenError(err, req, res, next) {
  let { status, message } = err

  if (!message) message = 'Forbidden'

  if (!status || status !== 403) {
    return next(err)
  } else {
    res.status(status)
    res.send({ status, message, success: false })
  }
}

function serverError(err, req, res, next) {
  console.log(`
  ${blue('✖️  ✖️  ✖️  Something went wrong:  ✖️  ✖️  ✖️')}

  ${bgBlue(err.stack)}

  ${blue('✖️  ✖️  ✖️')}
  `)

  res.status(500)
  res.send('Internal server error')
}

export default {
  notFound,
  serverError,
  forbiddenError,
  validationError,
  unauthorizedError
}
