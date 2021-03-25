const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  let id = request.params.id
  const blog = await Blog.findById(id)
    .populate('user', { username: 1, name: 1 })
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  let { title, url, likes } = request.body
  // 验证token有效性
  const decodedToken = jwt.verify(request.token, process.env.SECERT)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'invalid token'
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
  const id = request.params.id
  const blog = await Blog.findById(id)

  const decodedToken = jwt.verify(request.token, process.env.SECERT)
  if (!decodedToken.id || blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  await blog.remove()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  let id = request.params.id
  let likes = request.body.likes

  const result = await Blog.findByIdAndUpdate(id, { likes }, { new: true })
  response.json(result)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  let id = request.params.id
  let comment = request.body.comment

  const result = await Blog.findByIdAndUpdate(
    id,
    { $push: { comments: comment } },
    { new: true }
  )

  response.json(result)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  let id = request.params.id
  let comment = request.body.comment

  const result = await Blog.findByIdAndUpdate(
    id,
    { $push: { comments: comment } },
    { new: true }
  )

  response.json(result)
})

module.exports = blogsRouter
