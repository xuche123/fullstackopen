import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import { vi } from 'vitest'

describe('<Blog />', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 0,
    user: {
      username: 'Test username',
      name: 'Test name',
      id: 'Test id'
    }
  }

  let component, container
  const mockHandler = vi.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} handleLike={mockHandler} handleDelete={mockHandler} />)
    container = component.container
  })

  test('renders title and author', () => {
    expect(container).toHaveTextContent('Test title')
    expect(container).toHaveTextContent('Test author')
    expect(container).not.toHaveTextContent('Test url')
    expect(container).not.toHaveTextContent('likes')
  })
})