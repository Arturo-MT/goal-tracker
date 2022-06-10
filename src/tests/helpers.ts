import app from '../app'
import supertest from 'supertest'
import mongoose from 'mongoose'

const id1 = new mongoose.Types.ObjectId('100000000000000000000001')
const goalId1 = new mongoose.Types.ObjectId('100000000000000000000002')
const goalId2 = new mongoose.Types.ObjectId('100000000000000000000003')

const api = supertest(app)

const initialGoals = [
  {
    id: goalId1,
    name: '第一个',
    description: '这是第一个',
    date: new Date(),
    status: 'active',
    owner: id1,
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
    id: goalId2,
    name: '第二个',
    description: '这是第二个',
    date: new Date(),
    status: 'active',
    owner: id1,
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

const initialUsers = [
  {
    id: 1,
    userName: '张三',
    passwordHash: '123456',
    goals: [goalId1, goalId2]
  }
]

export { api, initialGoals, initialUsers }
