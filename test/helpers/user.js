const faker = require('faker')

module.exports.user = () => ({
  email: faker.internet.email(),
  name: faker.name.findName(),
  password: faker.internet.password(),
  facebook_token: faker.random.uuid(),
  facebook_id: faker.random.uuid(),
  role: 'USER'
})

module.exports.admin = () => ({
  email: faker.internet.email(),
  name: faker.name.findName(),
  password: faker.internet.password(),
  facebook_token: faker.random.uuid(),
  facebook_id: faker.random.uuid(),
  role: 'ADMIN'
})
