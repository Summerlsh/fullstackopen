import React, {useState, useEffect} from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleAddBlog = async event => {
    event.preventDefault()

    try {
      const newBlog = await blogService.createBlog({
        title, author, url
      })
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setMessageType('success')
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const LoginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification text={message} type="error"/>
      <form onSubmit={handleLogin}>
        <div>
          username <input value={username}
                          type="text"
                          onChange={({target}) => setUsername(target.value)}/>
        </div>
        <div>
          password <input value={password}
                          type="password"
                          onChange={({target}) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const CreateBlogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title: <input value={title}
                        type="text"
                        onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
          author: <input value={author}
                         type="text"
                         onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
          url: <input value={url}
                      type="text"
                      onChange={({target}) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

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
    ? LoginForm()
    : (
      <div>
        <h2>blogs</h2>
        <Notification text={message} type={messageType}/>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        {CreateBlogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )
}

export default App
