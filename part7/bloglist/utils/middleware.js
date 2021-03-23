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
    res.status(401).json({ error: 'token missing or invalid' })
  }
  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}
