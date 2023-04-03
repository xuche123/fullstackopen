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

	useEffect(() => {
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
			console.log(user)
		} catch {
			setMessage('wrong credentials')
			setType(0)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const loginForm = () => {
		if (user === null) {
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

		return (
			<div>
				<h2>blogs</h2>
				<p>{user.name} logged in</p>
				{blogs.map(blog =>
					<Blog key={blog.id} blog={blog} />
				)}
			</div>
		)
	}

	return (
		<div>
			<Notification message={message} type={type} />
			{loginForm()}
		</div>
	)
}

export default App