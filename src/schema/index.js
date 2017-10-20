import Joi from 'joi'

const User = Joi.object({
  id: Joi.number().integer(),
  email: Joi.string().email().max(255).required(),
  name: Joi.string().max(255).required(),
  username: Joi.string().min(3).max(255).required(),
  password: Joi.string().max(255)
})

const UserFilter = Joi.object({
  id: Joi.number().integer(),
  email: Joi.string().email().max(255),
  name: Joi.string().max(255),
  username: Joi.string().min(3)
})

export { User, UserFilter }
