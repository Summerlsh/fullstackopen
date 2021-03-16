import React, { useState } from 'react'

const Blog = ({ blog, user, handleUpdate, handleDelete }) => {
  const [showDetail, setShowDetail] = useState(false)

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
        <button onClick={() => setShowDetail(!showDetail)}>{buttonText}</button>
      </div>
      {
        showDetail
          ?
          <div>
            <div>{blog.url}</div>
            <div>
              likes <span id="likes">{blog.likes}</span>
              <button onClick={() => handleUpdate(blog)}>like</button>
            </div>
            <div>{blog.user.name}</div>
            {blog.user.id === user?.id ? <button onClick={() => handleDelete(blog)}>remove</button> : null}
          </div>
          : null
      }
    </div>
  )
}

export default Blog
