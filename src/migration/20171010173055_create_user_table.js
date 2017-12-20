exports.up = (knex) => {
  return knex.schema.createTableIfNotExists('user', table => {
    table.increments('id').notNullable().primary()
    table.string('name').notNullable()
    table.string('email').notNullable().unique()
    table.string('password')
    table.string('username').notNullable()
    table.timestamp('createdAt').defaultTo(knex.raw('now()'))
    table.timestamp('updatedAt').defaultTo(knex.raw('now()'))
  })
}

exports.down = (knex) => {
  return knex.raw(`DROP TABLE IF EXISTS \`user\``)
}
