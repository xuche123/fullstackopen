const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const User = require('../models/users')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('Get blog information', () => {
  let token = null

  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = await new User({
      username: 'root',
      passwordHash,
    }).save()

    // get token
    return (token = jwt.sign(
      { username: user.username, id: user.id },
      config.SECRET
    ))
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map((r) => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Canonical string reduction')
  })

  test('blogs without likes have 0 likes', async () => {
    const newBlog = helper.blogWithoutLikes

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    const target = response.body.filter((blog) => {
      return blog.title === 'blog without likes'
    })

    expect(target[0].likes).toBe(0)
  })
})

test('blogs can be updated', async () => {
  const update = {
    likes: 999,
  }

  const blogsAtStart = await helper.blogsInDb()

  const blogToUpdate = blogsAtStart[0]

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(update).expect(200)

  const response = await helper.blogsInDb()
  const likes = response.map((r) => r.likes)
  expect(likes).toContain(999)
})

describe('fails with statuscode 400 if', () => {
  let token = null

  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = await new User({
      username: 'root',
      passwordHash,
    }).save()

    // get token
    return (token = jwt.sign(
      { username: user.username, id: user.id },
      config.SECRET
    ))
  })

  test('note does not exist', async () => {
    const validNoneExistingId = await helper.nonExistingId()

    await api.get(`/api/notes/${validNoneExistingId}`).expect(404)
  })

  test('title property is empty', async () => {
    const newBlog = helper.blogWithoutTitle
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('url property is empty', async () => {
    const newBlog = helper.blogWithoutUrl
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('author property is empty', async () => {
    const newBlog = helper.blogWithoutAuthor
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a note', () => {
  let token = null

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = await new User({
      username: 'root',
      passwordHash,
    }).save()

    // get token
    token = jwt.sign({ username: user.username, id: user.id }, config.SECRET)

    const newBlog = helper.initialBlogs[0]

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    return token
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({}).populate('user')
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const title = blogsAtEnd.map((blog) => blog.title)
    expect(title).not.toContain(blogToDelete.title)
  })

  test('fails with status code 401 if id is valid but token is not provided', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401)

    const blogsAtEnd = await Blog.find({}).populate('user')
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
