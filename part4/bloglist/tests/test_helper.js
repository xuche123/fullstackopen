const Blog = require('../models/blogs')
const User = require('../models/users')

const initialBlogs = [
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
	},
	{
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
	}
]

const blogWithoutLikes = {
	title: 'blog without likes',
	author: 'Robert C. Martin',
	url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
}

const blogWithoutTitle = {
	author: 'thisshouldfail',
	url: 'thisshouldfail',
	likes: 1
}

const blogWithoutAuthor = {
	title: 'thisshouldfail',
	url: 'thisshouldfail',
	likes: 1
}

const blogWithoutUrl = {
	title: 'thisshouldfail',
	author: 'thisshouldfail',
	likes: 1
}

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'willremovethissoon',
		author: 'willremovethissoon',
		url: 'willremovethissoon',
		likes: 0
	})
	await blog.save()
	await blog.remove()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = {
	initialBlogs,
	blogWithoutLikes,
	blogWithoutAuthor,
	blogWithoutTitle,
	blogWithoutUrl,
	nonExistingId,
	blogsInDb,
	usersInDb
}