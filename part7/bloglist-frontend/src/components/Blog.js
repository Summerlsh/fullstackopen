import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Input, Typography, Space, Form } from 'antd'

import { deleteBlog, updateBlog, addNewComment } from '../reducers/blogReducer'

const { Title, Paragraph, Link } = Typography
const { TextArea } = Input

const Blog = ({ id }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const blogs = useSelector((state) => state.blogs)
  const [comment, setComment] = useState('')

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
    dispatch(addNewComment(blogId, comment))
    setComment('')
  }

  return (
    <Typography>
      <Title level={2}>
        {blog.title} {blog.author}
      </Title>
      <Paragraph>
        <div>
          <Link href={blog.url}>{blog.url}</Link>
        </div>
        <Space>
          <span className="likes">{blog.likes} likes</span>
          <Button onClick={() => updateLikes(blog)} size='small'>like</Button>
        </Space>
        <div>added by {blog.user.name}</div>
        {blog.user.id === loggedInUser.id ? (
          <Button onClick={() => removeBlog(blog)}>remove</Button>
        ) : null}
      </Paragraph>
      <Title level={3}>comments</Title>
      <Paragraph>
        <Form.Item>
          <TextArea rows={4} onChange={({ target }) => setComment(target.value)} value={comment}/>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={() => addComment(blog.id)} type="primary">
            Add Comment
          </Button>
        </Form.Item>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </Paragraph>
    </Typography>
  )
}

export default Blog
