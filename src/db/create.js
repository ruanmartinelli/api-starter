const qb = require('./')
const { DB_DATABASE } = process.env
const userService = require('../app/user/user-service')

const connection = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  debug: false
})

async function run () {
  try {
    await qb.raw('select 1;')
  } catch (err) {
    console.log(`Database "${DB_DATABASE}" is not created. Creating...`)
  }

  await connection.raw(`CREATE DATABASE IF NOT EXISTS ${DB_DATABASE};`)

  await qb.raw(`
  CREATE TABLE IF NOT EXISTS \`users\` (
    \`id\` bigint(20) NOT NULL AUTO_INCREMENT,
    \`email\` varchar(255) NOT NULL,
    \`name\` varchar(255) NOT NULL,
    \`password\` varchar(255) NOT NULL,
    \`facebook_token\` varchar(255) DEFAULT NULL,
    \`facebook_id\` varchar(255) DEFAULT NULL,
    \`role\` varchar(255) DEFAULT 'USER',
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`usuario_email_unique\` (\`email\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`)

  await userService.addUser({
    name: 'Test User',
    email: 'jane@test.com',
    password: '123test'
  })

  console.log('Done!')

  process.exit()
}

run()
