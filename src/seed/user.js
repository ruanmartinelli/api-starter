const scrypt = require('scrypt-for-humans')

exports.seed = async knex => {
  await knex('user').del()

  return knex('user').insert([
    {
      email: 'jonsnow@hotmail.com',
      name: 'Jon Snow',
      username: 'jj',
      password: await scrypt.hash('123'),
      role: 'admin'
    },
    {
      email: 'danny.stormborn@gmail.com',
      name: 'Daenerys',
      username: 'danny_dragon_queen',
      password: await scrypt.hash('abc'),
      role: 'user'
    }
  ])
}
