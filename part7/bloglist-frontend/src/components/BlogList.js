import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, notification } from 'antd'

import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import { createBlog, initializeBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

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
    notification.success({
      message: `a new blog ${blog.title} by ${blog.author} added`
    })
  }

  return (
    <div>
      <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Toggleable>
      <List
        size="large"
        bordered
        dataSource={blogs}
        renderItem={(blog) => (
          <List.Item>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </List.Item>
        )}
      />
    </div>
  )
}

export default BlogList
