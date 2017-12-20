import { isEmpty, pick } from 'lodash'
import scrypt from 'scrypt-for-humans'

import User from 'model/user'
import { ValidationError } from 'util/error'

const user = {
  read(options) {
    const { id } = options.params

    return User.findById(id)
  },

  browse(options) {
    const attrs = ['id', 'email']
    const filter = pick(options.query, attrs)

    return User.find(filter)
  },

  async add(user, options) {
    const { email } = user

    if (!email) throw new ValidationError('User has no email')

    const saved = await User.find({ email })

    if (!isEmpty(saved)) throw new ValidationError('User already exists')

    // Hashes user password
    user.password = await scrypt.hash(user.password)

    return User.insert(user)
  },

  edit(user, options) {
    user.id = options.params.id

    return User.update(user)
  },

  destroy(options) {
    const { id } = options.params

    return User.remove(id)
  }
}

export default user
