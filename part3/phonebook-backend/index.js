require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', req => {
  if (req.method === 'POST' && req.body) {
    return JSON.stringify({ name: req.body.name, number: req.body.number })
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', ((req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
}))

app.get('/info', (req, res) => {
  Person.countDocuments({})
    .then(result => {
      res.send(`
        <div>Phonebook has info for ${result} people</div>
        <p>${new Date()}</p>
      `)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const newPerson = {
    name: req.body.name,
    number: req.body.number
  }

  Person.findByIdAndUpdate(req.params.id, newPerson, { new: true, runValidators: true, context: 'query' })
    .then(returnedPerson => {
      if (returnedPerson) {
        res.json(returnedPerson)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  const person = new Person({
    name,
    number
  })

  person.save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.log(err.message)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ error: err.message })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
