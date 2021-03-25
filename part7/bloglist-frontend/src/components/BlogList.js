import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import { createBlog, initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogStyle = {
    border: '2px solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2,
  }

  const addBlog = async (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
    dispatch(
      setNotification(
        `a new blog ${blog.title} by ${blog.author} added`,
        'success',
        5
      )
    )
  }

  return (
    <div>
      <Toggleable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Toggleable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
