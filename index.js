require('dotenv').config()

const server = require('express')()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const boolParser = require('express-query-boolean')
const app = require('./src/app/')
const errorHandlers = require('./src/util/error-handlers')

server.use(cors())
server.use(bodyParser.json())
server.use(boolParser())
server.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }))

app.init(server)

server.use(errorHandlers.notFound)
server.use(errorHandlers.validationError)
server.use(errorHandlers.serverError)

server.listen(process.env.PORT, (err) => {
  if (err) throw err

  console.log(`Listening on port ${process.env.PORT}`)
})
module.exports = server
