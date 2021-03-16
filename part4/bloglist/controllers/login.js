const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()

const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: 'Invalid username or password'
    })
  }

  const token = jwt.sign({
    username: user.username,
    id: user._id
  }, process.env.SECERT)

  res.json({
    token,
    id: user._id,
    username: user.username,
    name: user.name
  })
})

module.exports = loginRouter
