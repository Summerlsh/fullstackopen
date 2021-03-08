const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let {title, url, likes} = request.body
  if (title === undefined || url === undefined) {
    return response.status(400).json({error: 'title and url are required'})
  }
  if (likes === undefined) {
    likes = 0
  }
  const blog = new Blog({
    ...request.body,
    likes
  })

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  let id = request.params.id

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  let id = request.params.id
  let likes = request.body.likes

  const result = await Blog.findByIdAndUpdate(id, {likes}, {new: true})
  response.json(result)
})

module.exports = blogsRouter
