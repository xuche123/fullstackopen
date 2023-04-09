import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { setNotifications } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, postBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { login, logout, initializeUser } from './reducers/userReducer'
import userService from './services/users'
import { Routes, Route, Link, useParams } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => {
    return user
  })
  const blogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => b.likes - a.likes)
  })

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await dispatch(login(username, password))
      dispatch(setNotifications(`welcome ${user}`, 5, 1))
    } catch (exception) {
      dispatch(setNotifications('wrong username or password', 5, 0))
    }
  }
  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotifications(`${user.name} logged out`, 5, 1))
    setUsername('')
    setPassword('')
  }

  const handleLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
      dispatch(setNotifications(`blog ${blog.title} by ${blog.author} liked`, 5, 1))

    } catch (exception) {
      dispatch(setNotifications('something went wrong', 5, 0))
    }
  }

  const createBlog = async (newBlog) => {
    try {
      await dispatch(postBlog(newBlog, user))
      dispatch(setNotifications(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5, 1))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotifications('something went wrong', 5, 0))
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(removeBlog(blog, user.token))
        dispatch(setNotifications(`blog ${blog.title} by ${blog.author} removed`, 5, 1))
      } catch (exception) {
        dispatch(setNotifications('something went wrong', 5, 0))
      }
    }
  }

  const Blogs = ({ blogs }) => {

    return (
      <div>
        {blogs
          .map((blog) => (
            <div style={
              { border: 'solid', padding: 10, borderWidth: 1, marginBottom: 5 }
            } key={blog.id}>
              <Link to={`/blogs/${blog.id}`} key={blog.id}>
                {blog.title} {blog.author}
              </Link>
            </div>
          ))}
      </div>
    )
  }

  const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
      const fetchUsers = async () => {
        const users = await userService.getAllUsers()
        setUsers(users)
      }
      fetchUsers()
    }, [])

    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const User = () => {
    const [user, setUser] = useState(null)
    const id = useParams().id

    useEffect(() => {
      const fetchUser = async () => {
        const user = await userService.getUser(id)
        setUser(user)
      }
      fetchUser()
    }, [id])

    if (!user) {
      return null
    }

    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      )}
      <div>
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
      </div>

      <div>
        <Routes>
          <Route path="/" element={<Blogs blogs={blogs} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog handleLike={handleLike} handleDelete={handleDelete} user={user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
