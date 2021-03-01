const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

morgan.token('body', (req, res) => {
  if (req.method === 'POST' && req.body) {
    return JSON.stringify({name: req.body.name, number: req.body.number})
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122'
  }
]

app.get('/api/persons', ((req, res) => {
  res.json(persons)
}))

app.get('/info', (req, res) => {
  res.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const newPerson = req.body
  if (typeof newPerson.name === 'undefined'
    || typeof newPerson.number === 'undefined'
    || newPerson.name === ''
    || newPerson.number === '') {
    return res.status(400).json({error: 'name or number cannot be empty'})
  }
  if (persons.find(p => p.name === newPerson.name)) {
    return res.status(400).json({error: 'name must be unique'})
  }
  newPerson.id = Math.floor(Math.random() * 1000000)

  persons = persons.concat(newPerson)
  res.status(201).json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
