exports.up = knex => {
  return knex.schema.table('user', table => {
    table.string('role')
  })
}

exports.down = knex => {
  return knex.schema.table('user', table => {
    table.dropColumn('role')
  })
}
