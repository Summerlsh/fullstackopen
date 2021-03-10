const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  // 初始化 blog
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the name of unique identify is id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('add a new blog', () => {
  let authorization

  beforeAll(async () => {
    // 初始化 user
    await User.deleteMany({})
    const user = {
      username: 'Amay',
      name: 'Amay',
      password: '123456'
    }
    await api.post('/api/users').send(user)

    const response = await api
      .post('/api/login')
      .send({
        username: 'Amay',
        password: '123456'
      })
    console.log('response:', response)

    authorization = `Bearer ${response.body.token}`
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test add',
      author: 'Shawn',
      url: 'http://are.you.ok',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', authorization)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Test add')
  })

  test('likes defaults to 0', async () => {
    const newBlog = {
      title: 'Test add',
      author: 'Shawn',
      url: 'http://are.you.ok'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', authorization)
      .expect(201)
    expect(response.body.likes).toBe(0)
  })

  test('title and url must be not empty', async () => {
    const newBlog = {
      author: 'Shawn',
      url: 'http://are.you.ok'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', authorization)
      .expect(400)
  })

  test('token missing should return code 401', async () => {
    const newBlog = {
      title: 'Test add',
      author: 'Shawn',
      url: 'http://are.you.ok',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('delete a blog', () => {
  test('should delete a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update a blog', () => {
  test('should update a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 77 })
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body.likes).toBe(77)
  })
})

describe('create user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: 'username',
      name: 'name',
      password: 'password'
    })
    await user.save()
  })

  test('should add a new user', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'newUser',
      name: 'Test',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('username must be unique', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'username',
      name: 'Test',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('the length of username must be greater than 3', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'ne',
      name: 'Test',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('the length of password must be greater than 3', async () => {
    const newUser = {
      username: 'new',
      name: 'Test',
      password: '12'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
