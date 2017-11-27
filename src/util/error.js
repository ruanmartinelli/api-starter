function validation(message) {
  return {
    status: 422,
    success: false,
    message
  }
}

function unauthorized(message) {
  return {
    status: 401,
    success: false,
    message: message || `Please login first`
  }
}

function forbidden() {
  return {
    status: 403,
    success: false,
    message: `Sorry, you don't have access to perform this action`
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.status = 422
  }
}

export class ForbiddenError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.status = 403
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.status = 401
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.status = 401
  }
}

export default {
  forbidden, unauthorized, validation
}
