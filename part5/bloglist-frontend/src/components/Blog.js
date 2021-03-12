import React, {useState} from 'react'

const Blog = ({blog, user}) => {
  const [show, setShow] = useState(false)

  const buttonText = show ? 'hide' : 'view'
  const detailStyle = {display: show ? '' : 'none'}
  const blogStyle = {
    border: '2px solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
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
          <button>like</button>
        </div>
        <div>{user.name}</div>
      </div>
    </div>
  );
}

export default Blog
