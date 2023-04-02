const bcrypt = require('bcryptjs')
const User = require('../models/users')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const config = require('../utils/config')
const helper = require('./test_helper')

const api = supertest(app)

beforeAll(async () => {
	await mongoose.disconnect()
	await mongoose.connect(config.MONGODB_URI)
})

beforeEach(async () => {
	await User.deleteMany({})
	const passwordHash = await bcrypt.hash('secret', 10)
	const user = new User({
		username: 'root',
		passwordHash
	})

	await user.save()
})

describe('when there is initially one user in db', () => {
	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()
		// console.log(usersAtStart)
		const newUser = {
			username: 'newuser',
			name: 'New User',
			password: 'password'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		// console.log('DEBUG ::::: ', usersAtStart)

		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(user => user.username)
		expect(usernames).toContain(newUser.username)
	})
})

describe('user will not be added', () => {
	test('if there exists a user with the same name', async () => {

		const user = {
			username: 'root',
			name: 'New User',
			password: 'password'
		}

		await api.post('/api/users')
			.send(user)
			.expect(400)
	})

	test('if the password is less than 3 characters', async () => {
		const user = {
			username: 'test',
			name: 'New User',
			password: '12'
		}

		await api
			.post('/api/users')
			.send(user)
			.expect(400)
	})

	test('if the username is less than 3 characters', async () => {
		const user = {
			username: 'te',
			name: 'New User',
			password: '12345'
		}

		await api
			.post('/api/users')
			.send(user)
			.expect(400)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})