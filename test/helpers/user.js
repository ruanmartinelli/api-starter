const faker = require('faker')

module.exports.user = () => ({
  email: faker.internet.email(),
  name: faker.name.findName(),
  password: faker.internet.password(),
  role: 'USER'
})

module.exports.admin = () => ({
  email: faker.internet.email(),
  name: faker.name.findName(),
  password: faker.internet.password(),
  role: 'ADMIN'
})
