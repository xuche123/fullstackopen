const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const config = require('../utils/config')
const Blog = require('../models/blogs')
const helper = require('./test_helper')

const api = supertest(app)

// fix for "Jest did not exit one second after the test run has completed."
beforeAll(async () => {
	await mongoose.disconnect()
	await mongoose.connect(config.MONGODB_URI)
})


beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('blogs have id attribute', async () => {
	const response = await api.get('/api/blogs')
	// console.log(response.body[1].id)
	expect(response.body[1].id).toBeDefined()
})

test('blogs can be added', async () => {
	const newBlog = helper.initialBlogs[0]

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')
	const titles = response.body.map(r => r.title)

	expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
	expect(titles).toContain('Canonical string reduction')
})

test('blogs without likes have 0 likes', async () => {
	const newBlog = helper.blogWithoutLikes

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)

	const response = await api.get('/api/blogs')
	const target = response.body.filter(blog => {
		return blog.title === 'blog without likes'
	})

	expect(target[0].likes).toBe(0)
})

describe('fails with statuscode 400 if', () => {

	test('title property is empty', async () => {
		const newBlog = helper.blogWithoutTitle
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})

	test('url property is empty', async () => {
		const newBlog = helper.blogWithoutUrl
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})

})

describe('deletion of a note', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
		const title = blogsAtEnd.map(blog => blog.title)

		expect(title).not.toContain(blogToDelete.title)
	})
})

test('blogs can be updated', async () => {
	const update = {
		likes: 999
	}

	const blogsAtStart = await helper.blogsInDb()

	const blogToUpdate = blogsAtStart[0]

	await api
		.put(`/api/blogs/${blogToUpdate.id}`)
		.send(update)
		.expect(200)

	const response = await helper.blogsInDb()
	const likes = response.map(r => r.likes)
	expect(likes).toContain(999)
})

afterAll(async () => {
	await mongoose.connection.close()
})