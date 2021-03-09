const _ = require('lodash')
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let { title, url, likes } = request.body
  if (title === undefined || url === undefined) {
    return response.status(400).json({ error: 'title and url are required' })
  }
  if (likes === undefined) {
    likes = 0
  }
  const users = await User.find({})
  const randomUser = _.sample(users)
  const blog = new Blog({
    ...request.body,
    likes,
    user: randomUser._id
  })

  const savedBlog = await blog.save()
  // 更新user的blogs字段
  randomUser.blogs = randomUser.blogs.concat(savedBlog)
  await randomUser.save()

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
