const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let {title, url, likes} = request.body
  if (title === undefined || url === undefined) {
    return response.status(400).send({error: 'title and url are required'})
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

module.exports = blogsRouter
