/* eslint prefer-promise-reject-errors: "off" */

function validation (message) {
  return Promise.reject({
    status: 422,
    success: false,
    message
  })
}

function unauthorized (message) {
  return Promise.reject({
    status: 401,
    success: false,
    message: message || `Please login first`
  })
}

function forbidden () {
  return Promise.reject({
    status: 401,
    success: false,
    message: `Sorry, you don't have access to perform this action`
  })
}

module.exports = {
  validation,
  forbidden,
  unauthorized
}
