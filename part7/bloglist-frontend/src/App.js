import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, deleteBlog, updateBlog } from './reducers/blogReducer'
import { getUserInfo, logout } from './reducers/userReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUserInfo())
  }, [dispatch])

  const addBlog = async (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
    dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'success', 5))
  }

  const updateLikes = async blog => {
    // likes +1
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(updateBlog(updatedBlog))
  }

  const removeBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return user === null
    ? <LoginForm/>
    :
    <div>
      <h2>blogs</h2>
      <Notification content={notification.message} type={notification.messageType}/>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Toggleable buttonLabel='create new note' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Toggleable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
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
