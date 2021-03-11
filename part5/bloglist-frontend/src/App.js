import React, {useEffect, useState} from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [user, setUser] = useState(null)


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
      const newBlog = await blogService.createBlog(blogObject)

      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setMessageType('success')
      setBlogs(blogs.concat(newBlog))
    } catch (err) {
      const res = err.response.data
      setMessage(`${res.error}`)
      setMessageType('error')
    }
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
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
    ? (<LoginForm message={message}
                  username={username}
                  password={password}
                  handleUsernameChange={({target}) => setUsername(target.value)}
                  handlePasswordChange={({target}) => setPassword(target.value)}
                  handleSubmit={handleLogin}/>)
    : (
      <div>
        <h2>blogs</h2>
        <Notification text={message} type={messageType}/>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <Toggleable buttonLabel='new note'>
          <BlogForm createBlog={addBlog}/>
        </Toggleable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )
}

export default App
