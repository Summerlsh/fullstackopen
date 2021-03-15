import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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
  expect(component.container.querySelector('.blog')).toBeDefined()
  expect(component.container).toHaveTextContent('Alice')
})

test('It should show url and likes after clicking the button', () => {
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

  expect(component.container).not.toHaveTextContent('likes')
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('http://localhost:3000')
  expect(component.container).toHaveTextContent('likes')
})

test('the like button is clicked twice, the event handler should be called twice', () => {
  const handleUpdate = jest.fn()
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
    <Blog blog={blog} handleUpdate={handleUpdate}/>
  )
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(handleUpdate.mock.calls).toHaveLength(2)
})

