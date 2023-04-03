import React from 'react'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [message, setMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [type, setType] = useState(0)
	const [newBlog, setNewBlog] = useState({
		title: '',
		author: '',
		url: '',
		likes: ''
	})


	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
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
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
		} catch (exception) {
			setMessage('wrong credentials')
			setType(0)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const addBlog = async (event) => {
		event.preventDefault()
		try {
			const response = await blogService.create(newBlog)
			setBlogs(blogs.concat(response))
			setNewBlog({
				title: '',
				author: '',
				url: '',
				likes: ''
			})
			setMessage(`a new blog ${response.title} by ${response.author} added`)
			setType(1)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch (exception) {
			// console.log(exception)
			setMessage('something went wrong')
			setType(0)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
		
	}

	const loginForm = () => {
		return (
			<form onSubmit={handleLogin}>
				<h2>Log in to application</h2>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		)

	}


	const blogForm = () => {
		return (
			<form onSubmit={addBlog}>
				<div>
					title:
					<input
						type="text"
						value={newBlog.title}
						name="Title"
						onChange={({ target }) => setNewBlog({
							...newBlog,
							title: target.value,
						})}
					/>
				</div>
				<div>
					author:
					<input
						type="text"
						value={newBlog.author}
						name="Author"
						onChange={({ target }) => setNewBlog({
							...newBlog,
							author: target.value,
						})}
					/>
				</div>

				<div>
					url:
					<input
						type="text"
						value={newBlog.url}
						name="Title"
						onChange={({ target }) => setNewBlog({
							...newBlog,
							url: target.value,
						})}
					/>
				</div>
				<div>
					likes:
					<input
						type="text"
						value={newBlog.likes}
						name="likes"
						onChange={({ target }) => setNewBlog({
							...newBlog,
							likes: target.value,
						})}
					/>
				</div>

				<button type="submit">create</button>
			</form>
		)
	}

	return (
		<div>
			<Notification message={message} type={type} />
			{!user && loginForm()}
			{user && <div>
				<p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
				{blogForm()}
			</div>}
			<div>
				<h2>blogs</h2>
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</div>
		</div>
	)
}

export default App