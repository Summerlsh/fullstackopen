const morgan = require('morgan')
const logger = require('./logger')

const requestLogger = morgan('dev')

const unknownEndpoint = (req, res) => {
  res.status(404).send('unknown endpoint')
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    res.status(400).json({ error: 'malformatted id' })
  }
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message })
  }
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'invalid token' })
  }
  next(err)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
