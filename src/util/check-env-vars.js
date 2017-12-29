import joi from 'joi'
import validateSchema from 'util/validate-schema'

// prettier-ignore
const envVarsSchema = joi
  .object({
    APP_NAME: joi.string().required(),
    APP_PORT: joi.number().required(),
    APP_EMAIL_SENDER: joi.string().email(),
    DB_HOST: joi.string().hostname().required(),
    DB_USER: joi.string().required(),
    DB_DATABASE: joi.string().required(),
    JWT_SECRET: joi.string().token().min(10).required(),
    JWT_EXPIRES_IN: joi.string().required(), // @TODO: use regex to match expressions like '1h'
    SES_HOST: joi.string().required(),
    SES_PORT: joi.number().required(),
    SES_USER: joi.string().required(),
    SES_PASSWORD: joi.string().required()
  })
  .unknown()
  .required()

/**
 * Checks if all the required environment variables are present.
 *
 * @throws {Error} Will throw an error if one variable is missing
 */
function checkEnvVars() {
  const { error: err, value } = joi.validate(process.env, envVarsSchema)

  if (err) throw new Error(`Env error: ` + err.details[0].message)
}

export default checkEnvVars
