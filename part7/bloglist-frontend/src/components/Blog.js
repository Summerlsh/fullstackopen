import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'

const Blog = ({ id }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return null
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
      history.replace('/')
    }
  }

  return (
    <div>
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
      </div>
      <div>
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
      </div>
    </div>
  )
}

export default Blog
