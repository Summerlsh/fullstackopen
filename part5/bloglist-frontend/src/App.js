import React, { useEffect, useState, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      const res = err.response.data
      setMessage(`${res.error}`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      await blogService.createBlog(blogObject)
      const newBlogs = await blogService.getAll()
      blogFormRef.current.toggleVisibility()
      setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
      setMessageType('success')
      setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch (err) {
      const res = err.response.data
      setMessageType('error')
      setMessage(`${res.error}`)
    }
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const updateLikes = async blogObject => {
    try {
      // likes +1
      const updatedBlog = {
        ...blogObject,
        likes: blogObject.likes + 1
      }
      await blogService.updateLikes(updatedBlog)
      setBlogs(blogs
        .map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
        .sort((a, b) => b.likes - a.likes))
    } catch (err) {
      const res = err.response.data
      setMessage(`${res.error}`)
      setMessageType('error')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const removeBlog = async blogObject => {
    try {
      if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
        await blogService.removeBlog(blogObject.id)
        setBlogs(blogs
          .filter(blog => blog.id !== blogObject.id)
          .sort((a, b) => b.likes - a.likes))
      }
    } catch (err) {
      const res = err.response.data
      setMessage(`${res.error}`)
      setMessageType('error')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  useEffect(() => {
    const fetchData = async () => {
      let blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON !== null) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return user === null
    ? <LoginForm message={message}
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}/>
    :
    <div>
      <h2>blogs</h2>
      <Notification text={message} type={messageType}/>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Toggleable buttonLabel='create new note' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Toggleable>

      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          user={user}
          handleUpdate={updateLikes}
          handleDelete={removeBlog}
        />
      )}
    </div>
}

export default App
