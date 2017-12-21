import faker from 'faker'

export function user() {
  return {
    email: faker.internet.email(),
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: '123',
    role: 'user'
  }
}

export function admin() {
  return {
    email: faker.internet.email(),
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: '123',
    role: 'admin'
  }
}
