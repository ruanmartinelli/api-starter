// Note: this script should work independent from the app
//       and run with a simple `node <script>.js` so I am avoiding
//       things like babel, etc.

require('dotenv').config()

const { DB_DATABASE, DB_HOST, DB_USER, DB_PASSWORD } = process.env

const conn = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  debug: false
})

/**
 * Database creation script
 */
;(async () => {
  // Tries to run a random query and see if the Database is created
  try {
    await conn.raw(`USE ${DB_DATABASE};`)
  } catch (err) {
    if (err.code === 'ER_BAD_DB_ERROR') {
      console.log(`Database "${DB_DATABASE}" is not created. Creating...`)
    } else {
      throw err
    }
  }

  await conn.raw(`CREATE DATABASE IF NOT EXISTS ${DB_DATABASE};`)

  await conn.raw(`USE ${DB_DATABASE};`)

  // Creates the "user" table
  await conn.schema.createTableIfNotExists('user', table => {
    table.increments('id').unsigned()
    table.string('username')
    table.string('name')
    table.string('email')
    table.string('password')
    table.date('createdAt')
  })

  // Add more tables here

  process.exit()
})().catch(err => {
  console.log(err)
  process.exit(1)
})
