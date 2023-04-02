const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

blogsRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		}).catch(error => {
			response.status(400).json(error)
		})
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		request.body,
		{ new: true, runValidators: true, context: 'query' })

	response.json(updatedBlog)
})

module.exports = blogsRouter