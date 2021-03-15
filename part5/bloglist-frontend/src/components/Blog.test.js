import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog\'s title and author', () => {
  const blog = {
    title: 'Test',
    author: 'Alice',
    url: 'http://localhost:3000',
    likes: 10,
    user: {
      id: '123',
      name: 'test',
      username: 'test'
    }
  }

  const component = render(
    <Blog blog={blog}/>
  )
  component.debug()
  expect(component.container.querySelector('.blog')).toBeDefined()
  expect(component.container).toHaveTextContent('Alice')
})
