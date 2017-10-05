const environmentVariables = [
  'APP_NAME',
  'APP_PORT',
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_DATABASE',
  'JWT_SECRET',
  'JWT_EXPIRES_IN'
]

/**
 * Checks if all the required environment variables are present.
 *
 * @throws {Error} Will throw an error if one variable is missing
 */
function checkEnvVars () {
  for (const variable of environmentVariables) {
    if (!process.env[variable]) {
      throw new Error(`Environment variable ${variable} is missing`)
    }
  }
}

export default checkEnvVars
