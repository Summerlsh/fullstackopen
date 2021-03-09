const bcrypt = require('@node-rs/bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const result = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  res.json(result)
})

usersRouter.post('/', async (req, res) => {
  let { username, name, password } = req.body
  if (password.length < 3) {
    return res.status(400).json({
      error: '`password` is shorter than the minimum allowed length (3).'
    })
  }
  const passwordHashed = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    name,
    password: passwordHashed
  })

  const result = await newUser.save()
  res.status(201).json(result)
})

module.exports = usersRouter
