require('dotenv').config()

const config = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `./src/migration/`
  }
}

const development = config
const production = config
const test = config

module.exports = {
  development,
  production,
  test
}
