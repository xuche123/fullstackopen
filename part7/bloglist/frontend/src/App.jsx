import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [type, setType] = useState(0)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then((blogs) => {
      // blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      // user is an object with username, name, and token
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      setMessage(`Welcome ${user.name}`)
      setType(1)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    } catch (exception) {
      setMessage('wrong credentials')
      setType(0)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLike = async (blog) => {
    const newBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    }
    const response = await blogService.update(blog.id, newBlog)
    response.user = blog.user
    setBlogs(blogs.map((b) => (b.id === blog.id ? response : b)))
  }

  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)
      const id = response.user
      response.user = {
        username: user.username,
        name: user.name,
        id: id,
      }
      setBlogs(blogs.concat(response))
      setType(1)
      setMessage(`a new blog ${response.title} by ${response.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setMessage('something went wrong')
      setType(0)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        setType(1)
        setMessage(`blog ${blog.title} by ${blog.author} removed`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (exception) {
        setMessage('something went wrong')
        setType(0)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} type={type} />
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      )}
      {user && (
        <div>
          <p>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="Add new entry..." ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}

      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              user={user}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  )
}

export default App
