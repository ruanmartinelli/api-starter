const faker = require('faker')

module.exports.createUser = () => ({
  email: faker.internet.email(),
  name: faker.name.findName(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
  role: 'user'
})
