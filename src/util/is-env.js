import 'dotenv/config'
import { isString } from 'lodash'

export default function isEnv(envName) {
  return (
    isString(envName) &&
    isString(process.env.NODE_ENV) &&
    envName.toUpperCase() === process.env.NODE_ENV.toUpperCase()
  )
}
