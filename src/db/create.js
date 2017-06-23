const qb = require('./')

async function run () {
  await qb.raw('select 1;')

  await qb.schema.createTableIfNotExists('users', (table) => {
    table.increments('id')
    table.string('name')
    table.string('email')
    table.string('password')
    table.string('role').defaultTo('USER')
    table.timestamp('created_at').defaultTo(qb.raw('now()'))
    table.timestamp('updated_at').defaultTo(qb.raw('now()'))
  })

  console.log('Done!')
  process.exit()
}

run()
