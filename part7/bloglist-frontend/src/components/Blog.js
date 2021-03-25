import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Blog = ({ blog, handleUpdate, handleDelete }) => {
  const [showDetail, setShowDetail] = useState(false)
  const loggedInUser = useSelector(state => state.loggedInUser)

  if (blog === null) {
    return null
  }

  const buttonText = showDetail ? 'hide' : 'view'
  const blogStyle = {
    border: '2px solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetail(!showDetail)} className="showDetail">{buttonText}</button>
      </div>
      {
        showDetail
          ?
          <div>
            <div>{blog.url}</div>
            <div>
              likes <span className="likes">{blog.likes}</span>
              <button onClick={() => handleUpdate(blog)}>like</button>
            </div>
            <div>{blog.user.name}</div>
            {blog.user.id === loggedInUser.id ? <button onClick={() => handleDelete(blog)}>remove</button> : null}
          </div>
          : null
      }
    </div>
  )
}

export default Blog
