import React from 'react'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { deleteBlog, updateBlog, addNewComment } from '../reducers/blogReducer'
import { useField } from '../hooks'

const Blog = ({ id }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const blogs = useSelector((state) => state.blogs)
  const comment = useField('text')

  const blog = blogs.find((blog) => blog.id === id)
  if (!blog) {
    return null
  }

  const updateLikes = (blog) => {
    // likes +1
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateBlog(updatedBlog))
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      history.replace('/')
    }
  }

  const addComment = (blogId) => {
    dispatch(addNewComment(blogId, comment.value))
    comment.reset()
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        <span className="likes">{blog.likes} likes</span>
        <button onClick={() => updateLikes(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.id === loggedInUser.id ? (
        <button onClick={() => removeBlog(blog)}>remove</button>
      ) : null}
      <h3>comments</h3>
      <div>
        <input {..._.omit(comment, ['reset'])}/>
        <button onClick={() => addComment(blog.id)}>add comment</button>
      </div>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
