import { isEmpty, pick } from 'lodash'
import scrypt from 'scrypt-for-humans'

import User from 'model/user'
import { ValidationError } from 'util/error'

const user = {
  read(options) {
    const { id } = options

    return User.findById(id)
  },

  browse(options) {
    const attrs = ['id', 'email']
    const filter = pick(options, attrs)

    return User.find(filter)
  },

  async add(user, options) {
    const { email } = user

    if (!email) throw new ValidationError('User has no email')

    const saved = await User.find({ email })

    if (!isEmpty(saved)) throw new ValidationError('User already exists')

    // Hashes user password
    user.password = await scrypt.hash(user.password)

    return User.create(user)
  },

  edit(user, options) {
    user.id = options.id

    return User.update(user)
  },

  destroy(options) {
    const { id } = options

    return User.remove(id)
  }
}

export default user
