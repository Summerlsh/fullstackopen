import React, {useState} from 'react'

import blogService from "../services/blogs";

const Blog = (props) => {
  const [blog, setBlog] = useState(props.blog)
  const [show, setShow] = useState(false)

  if (blog === null) {
    return null
  }

  const buttonText = show ? 'hide' : 'view'
  const detailStyle = {display: show ? '' : 'none'}
  const blogStyle = {
    border: '2px solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
  }
  const removeBtnStyle = {
    display: blog.user.name === props.user.name ? '' : 'none'
  }

  const updateLikes = async blog => {
    // likes +1
    let likes = blog.likes + 1
    await blogService.updateLikes({
      ...blog,
      likes
    })
    setBlog({...blog, likes})
  }

  const removeBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.removeBlog(blog.id)
      setBlog(null)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShow(!show)}>{buttonText}</button>
      </div>
      <div style={detailStyle}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => updateLikes(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button style={removeBtnStyle} onClick={() => removeBlog(blog)}>remove</button>
      </div>
    </div>
  );
}

export default Blog
