import React from 'react'
import _ from 'lodash'

import { useField } from '../hooks'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleSubmit = async event => {
    event.preventDefault()

    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })

    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input id="title" {..._.omit(title, ['reset'])}/>
        </div>
        <div>
          author: <input id="author" {..._.omit(author, ['reset'])}/>
        </div>
        <div>
          url: <input id="url" {..._.omit(url, ['reset'])}/>
        </div>
        <button type="submit" id="createBtn">create</button>
      </form>
    </div>
  )
}

export default BlogForm
