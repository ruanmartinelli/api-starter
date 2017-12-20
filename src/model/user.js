import connection from 'db/'
import Model from '@ruanmartinelli/knex-model'
import { User as UserSchema } from 'schema'
import validateSchema from 'util/validate-schema'

const options = {
  tableName: 'user',
  connection,
  beforeCreate: user => validateSchema(user, UserSchema),
  beforeUpdate: user => validateSchema(user, UserSchema)
}

class User extends Model {
  constructor(options) {
    super(options)
  }
}

export default new User(options)
