import React from 'react'
import '@testing-library/jest-dom/extend-expect'
// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
      id: 'Test id',
    },
  }

  let component, container
  const mockHandler = vi.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} handleLike={mockHandler} handleDelete={mockHandler} />
    )
    container = component.container
  })

  test('renders title and author', () => {
    expect(container).toHaveTextContent('Test title')
    expect(container).toHaveTextContent('Test author')
    expect(container).not.toHaveTextContent('Test url')
    expect(container).not.toHaveTextContent('likes')
  })

  test('renders url and likes when view button is clicked', async () => {
    const user = userEvent.setup()
    const button = component.getByText('view')
    await user.click(button)

    expect(container).toHaveTextContent('Test url')
    expect(container).toHaveTextContent('likes')
  })

  test('clicking like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const button = component.getByText('view')
    await user.click(button)

    const likeButton = component.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
