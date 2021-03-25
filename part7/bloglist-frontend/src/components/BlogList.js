import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { createBlog, deleteBlog, initializeBlogs, updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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

  const updateLikes = async (blog) => {
    // likes +1
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateBlog(updatedBlog))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div>
      <Toggleable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Toggleable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdate={updateLikes}
            handleDelete={removeBlog}
          />
        ))}
    </div>
  )
}

export default BlogList
