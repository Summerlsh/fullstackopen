import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input value={title}
            id="title"
            type="text"
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author: <input value={author}
            id="author"
            type="text"
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url: <input value={url}
            id="url"
            type="text"
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
