import { Goall } from '../models/goal'
import mongoose from 'mongoose'
import server from '../server'
import { api, initialGoals } from './helpers'

const connectionString: string = process.env.MongoDB_URI_Test as string

beforeEach(async () => {
  await mongoose.connect(connectionString)
  await Goall.deleteMany({})

  await Promise.all(initialGoals.map(goal => new Goall(goal).save()))
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

describe('Goals', () => {
  test('are returned as JSON', async () => {
    return await api
      .get('/api/goals')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two goals', async () => {
    const response: any = await api.get('/api/goals')
    expect(response.body).toHaveLength(initialGoals.length)
  })

  test('the first goal has the correct name', async () => {
    const response: any = await api.get('/api/goals')
    expect(response.body[0].name).toBe(initialGoals[0].name)
  })

  test('a goal can be added', async () => {
    const ownerId = new mongoose.Types.ObjectId('123456789012345678901234')

    const newGoal = {
      id: 3,
      name: '第三个',
      description: '这是第三个',
      date: new Date(),
      status: 'active',
      owner: ownerId,
      progress: [
        {
          day: 1,
          date: new Date(),
          value: 100,
          extra: false
        }
      ]
    }

    const response: any = await api
      .post('/api/goals')
      .send(newGoal)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.name).toBe(newGoal.name)

    const goals = await api.get('/api/goals')
    expect(goals.body).toHaveLength(initialGoals.length + 1)
  })

  test('a goal can be deleted', async () => {
    const goals: any = await api.get('/api/goals')
    const goalToDelete = goals.body[0].id as string

    await api.delete('/api/goals/' + goalToDelete).expect(200)

    const response: any = await api.get('/api/goals')
    expect(response.body).toHaveLength(initialGoals.length - 1)
  })

  test('a goal can be updated', async () => {
    const goals: any = await api.get('/api/goals')
    const goalToUpdate = goals.body[0].id as string
    const ownerId = new mongoose.Types.ObjectId('123456789012345678901234')

    const updatedGoal = {
      name: '第一个',
      description: '这是第一个',
      date: new Date(),
      status: 'active',
      owner: ownerId,
      progress: [
        {
          day: 1,
          date: new Date(),
          value: 100,
          extra: false
        }
      ]
    }

    const response: any = await api
      .put('/api/goals/' + goalToUpdate)
      .send(updatedGoal)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.owner).toBe('123456789012345678901234')
  })

  test('an invalid goal cannot be added', async () => {
    const newGoal = {
      id: 3,
      date: new Date(),
      status: 'active',
      owner: '张三',
      progress: [
        {
          day: 1,
          date: new Date(),
          value: 100,
          extra: false
        }
      ]
    }

    await api
      .post('/api/goals')
      .send(newGoal)
      .expect(400)

    const goals = await api.get('/api/goals')
    expect(goals.body).toHaveLength(initialGoals.length)
  })

  test('an invalid goal cannot be updated', async () => {
    const goals: any = await api.get('/api/goals')
    const goalToUpdate = goals.body[0].id as string

    const updatedGoal = {
      date: new Date(),
      status: 'active',
      owner: 'admin',
      progress: [
        {
          day: 1,
          date: new Date(),
          value: 100,
          extra: false
        }
      ]
    }

    await api
      .put('/api/goals/' + goalToUpdate)
      .send(updatedGoal)
      .expect(400)

    const response = await api.get('/api/goals')
    expect(response.body).toHaveLength(initialGoals.length)
  })

  test('an invalid goal cannot be deleted', async () => {
    await api.delete('/api/goals/' + 'invalid').expect(404)

    const goals = await api.get('/api/goals')
    expect(goals.body).toHaveLength(initialGoals.length)
  })

  test('a goal with invalid id cannot be found', async () => {
    await api.get('/api/goals/' + 'invalid').expect(404)
  })
})
