import Model from './model'
import { User as UserSchema } from 'schema'
import validateSchema from 'util/validate-schema'

const options = {
  tableName: 'user',
  columns: [],
  joins: [],
  rawJoins: [],
  foreignColumns: [],
  idAttribute: 'id',
  camelCase: true,
  timestamps: true,
  beforeCreate: user => validateSchema(user, UserSchema),
  beforeUpdate: user => validateSchema(user, UserSchema)
}

class User extends Model {
  constructor(options) {
    super(options)
  }
}

export default new User(options)
