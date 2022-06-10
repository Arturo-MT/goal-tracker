import { User } from '../models/User'
import mongoose from 'mongoose'
import server from '../server'
import { initialUsers, api } from './helpers'

const connectionString: string = process.env.MongoDB_URI_Test as string

beforeEach(async () => {
  await mongoose.connect(connectionString)
  await User.deleteMany({})

  await Promise.all(initialUsers.map(user => new User(user).save()))
})

afterEach(() => {
  mongoose.connection
    .close()
    .then(() => {
      server.close()
    })
    .catch(() => {
      server.close()
    })
})

describe('Users', () => {
  test('are returned as JSON', async () => {
    return await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body.length).toBe(initialUsers.length)
  })

  test('a user can be added', async () => {
    const newUser = {
      id: 2,
      userName: 'test',
      passwordHash: 'test',
      goals: []
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    expect(response.body.userName).toBe(newUser.userName)

    const users = await api.get('/api/users').expect(200)
    expect(users.body.length).toBe(initialUsers.length + 1)
  })
})
