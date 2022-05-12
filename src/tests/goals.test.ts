import supertest from 'supertest'
import app from '../app'
import { dbConnect, dbDisconnect } from '../db/db'
import { Goall } from '../models/goal'
import server from '../server'

const initialGoals = [
  {
    id: 1,
    name: '第一个',
    description: '这是第一个',
    date: new Date(),
    status: 'active',
    owner: '张三',
    progress: [
      {
        day: 1,
        date: new Date(),
        value: 10,
        extra: false
      },
      {
        day: 2,
        date: new Date(),
        value: 30,
        extra: false
      },
      {
        day: 3,
        date: new Date(),
        value: 50,
        extra: false
      }
    ]
  },
  {
    id: 2,
    name: '第二个',
    description: '这是第二个',
    date: new Date(),
    status: 'active',
    owner: '张三',
    progress: [
      {
        day: 1,
        date: new Date(),
        value: 100,
        extra: false
      },
      {
        day: 2,
        date: new Date(),
        value: 50,
        extra: false
      },
      {
        day: 3,
        date: new Date(),
        value: 40,
        extra: false
      }
    ]
  }
]

beforeEach(async () => {
  await dbConnect()

  await Goall.deleteMany({})

  const goal1 = new Goall(initialGoals[0])
  await goal1.save()

  const goal2 = new Goall(initialGoals[1])
  await goal2.save()

  await dbDisconnect()
})

afterEach(async () => {
  server.close()
  await dbDisconnect()
})

const api = supertest(app)

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

  test('the last goal has the correct name', async () => {
    const response: any = await api.get('/api/goals')
    expect(response.body[initialGoals.length - 1].name).toBe(
      initialGoals[initialGoals.length - 1].name
    )
  })

  test('a goal can be added', async () => {
    const newGoal = {
      id: 3,
      name: '第三个',
      description: '这是第三个',
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

    const response: any = await api
      .post('/api/goals')
      .send(newGoal)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body.name).toBe(newGoal.name)
  })

  test('a goal can be deleted', async () => {
    await api
      .delete('/api/goals/' + initialGoals[0].id.toString())
      .expect(200)
  })
})
