const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let { title, url, likes } = request.body
  // 验证token有效性
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECERT)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  if (title === undefined || url === undefined) {
    return response.status(400).json({ error: 'title and url are required' })
  }
  if (likes === undefined) {
    likes = 0
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    ...request.body,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  // 更新user的blogs字段
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  let id = request.params.id

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  let id = request.params.id
  let likes = request.body.likes

  const result = await Blog.findByIdAndUpdate(id, { likes }, { new: true })
  response.json(result)
})

module.exports = blogsRouter
