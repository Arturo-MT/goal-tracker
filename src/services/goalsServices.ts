import { Goal } from '../types'
import * as db from '../db/db'
import { Goall } from '../models/goal'
import { User } from '../models/User'

export const getAllGoals = async (): Promise<unknown> => {
  await db.dbConnect()
  return await Goall.find({})
    .then(async goals => {
      console.log('Data aquired from MongoDB')
      return goals
    })
    .catch(async err => {
      return await Promise.reject(new Error(err))
    })
}

export const getGoalById = async (id: string): Promise<Goal> => {
  await db.dbConnect()

  return await Goall.findById(id)
    .then(async goal => {
      console.log('Data aquired from MongoDB')
      await db.dbDisconnect()
      return goal
    })
    .catch(async (err: unknown) => {
      return await Promise.reject(err)
    })
}

export const addGoal = async (goal: Goal): Promise<Goal> => {
  await db.dbConnect()

  if (goal.name === undefined || goal.description === undefined) {
    return await Promise.reject(new Error('Missing Something'))
  }
  const user = await User.findById(goal.owner)

  const newGoal = new Goall({
    name: goal.name,
    description: goal.description,
    date: goal.date,
    status: goal.status,
    owner: user._id,
    progress: goal.progress
  })

  try {
    const goalSaved = await newGoal.save()
    user.goals = user.goals.concat(goalSaved._id)
    await user.save()

    console.log('Data saved to MongoDB')
    await db.dbDisconnect()
    return goalSaved
  } catch (error) {
    return await Promise.reject(new Error(error))
  }
}

export const deleteGoal = async (id: string): Promise<Goal> => {
  await db.dbConnect()

  return await Goall.findByIdAndDelete(id)
    .then(async goal => {
      console.log('Data deleted from MongoDB')
      await db.dbDisconnect()
      return goal
    })
    .catch(async err => {
      return await Promise.reject(new Error(err))
    })
}

export const updateGoal = async (id: string, goal: Goal): Promise<Goal> => {
  await db.dbConnect()

  if (goal.name === undefined || goal.description === undefined) {
    return await Promise.reject(new Error('Missing Something'))
  }

  return await Goall.findByIdAndUpdate(id, goal, { new: true })
    .then(goal => {
      console.log('Data updated in MongoDB')
      return goal
    })
    .catch(async err => {
      return await Promise.reject(new Error(err))
    })
}
