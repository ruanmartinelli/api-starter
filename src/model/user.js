import { head } from 'lodash'
import connection from 'db/'
import Model from '@ruanmartinelli/knex-model'
import { User as UserSchema } from 'schema'
import validateSchema from 'util/validate-schema'

const options = {
  tableName: 'user',
  connection,
  columns: ['id', 'name', 'username', 'email', 'role'],
  beforeCreate: user => validateSchema(user, UserSchema),
  beforeUpdate: user => validateSchema(user, UserSchema)
}

class User extends Model {
  constructor(options) {
    super(options)
  }

  findPassword(id) {
    return this.knex('user')
      .select('user.password')
      .where('id', id)
      .then(head)
  }
}

export default new User(options)
