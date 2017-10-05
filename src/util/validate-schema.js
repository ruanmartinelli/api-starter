import Joi from 'joi'
import error from './error'

/**
 * Validates an object according to a Joi schema and strip unknown keys
 *
 * @param {Object} obj
 * @param {Object} schema Joi schema
 * @throws {Error} validation error if the object is invalid
 */
function validateSchema (obj, schema) {
  const { error: err, value } = Joi.validate(obj, schema, {
    stripUnknown: true
  })

  if (err) {
    throw error.validation(err.details[0].message)
  } else {
    return value
  }
}

export default validateSchema
