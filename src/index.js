import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import boolParser from 'express-query-boolean'
import errorHandlers from 'util/error-handlers'
import checkEnvVars from 'util/check-env-vars'
import checkDbExists from 'util/check-db-exists'
import jobs from './job'
import api from './api'
import helmet from 'helmet'

checkEnvVars()

;(async () => {
  await checkDbExists()
})()

const server = express()
const port = process.env.PORT || process.env.APP_PORT

server.use(helmet({ frameguard: { action: 'deny' } }))
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(boolParser())
server.use(express.static('docs'))
server.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }))

jobs.init()
api.init(server)

server.use(errorHandlers.notFound)
server.use(errorHandlers.validationError)
server.use(errorHandlers.unauthorizedError)
server.use(errorHandlers.forbiddenError)
server.use(errorHandlers.serverError)

server.listen(port, err => {
  if (err) throw err

  console.log(`
  Server listening in ${process.env.NODE_ENV.toUpperCase()} mode on port ${
    port
  }...
  `)
})

export default server
