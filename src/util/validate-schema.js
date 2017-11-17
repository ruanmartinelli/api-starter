import Joi from 'joi'
import error from './error'

/**
 * Validates an object according to a Joi schema and strip unknown keys.
 * This method mutates the object.
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
    Object.keys(obj).forEach(key => delete obj[key])
    Object.keys(value).forEach(key => obj[key] = value[key])

    return value
  }
}

export default validateSchema
