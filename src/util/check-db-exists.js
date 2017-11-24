import knex from 'knex'
import db from 'db'
import 'dotenv/config'

async function checkDbExists() {
  try {
    await db.raw('select 1')
  } catch (err) {
    if (err.code && err.code == 'ER_BAD_DB_ERROR') {
      console.error(
        `ERROR: Database "${
          process.env.DB_DATABASE
        }" is not created. Please create the database and re-run the application.\nExiting...`
      )
      process.exit(1)
    } else {
      throw err
    }
  }
}

export default checkDbExists
