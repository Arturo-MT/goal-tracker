import { Goal } from '../types'
import * as db from '../db/db'
import { Goall } from '../models/goal'

export const getAllGoals = async (): Promise<unknown> => {
  await db.dbConnect()
  return await Goall.find({})
    .then(async goals => {
      console.log('Data aquired from MongoDB')
      await db.dbDisconnect
      return goals
    })
    .catch((err: unknown) => {
      console.log(err)
    })
}

export const getGoalById = async (id: string): Promise<Goal> => {
  return await Goall.findById(id)
    .then(goal => {
      console.log('Data aquired from MongoDB')
      return goal
    })
    .catch((err: unknown) => {
      console.log(err)
    })
}

export const addGoal = async (goal: Goal): Promise<Goal> => {
  await db.dbConnect()
  const newGoal = new Goall({
    name: goal.name,
    description: goal.description,
    date: goal.date,
    status: goal.status,
    owner: goal.owner,
    progress: goal.progress
  })

  return newGoal.save().then(async (goal: Goal) => {
    console.log('Data saved to MongoDB')
    await db.dbDisconnect()
    return goal
  })
}

export const deleteGoal = async (id: string): Promise<Goal> => {
  await db.dbConnect()
  return await Goall.findByIdAndDelete(id)
    .then(async goal => {
      console.log('Data deleted from MongoDB')
      await db.dbDisconnect()
      return goal
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateGoal = async (id: string, goal: Goal): Promise<Goal> => {
  return await Goall.findByIdAndUpdate(id, goal, { new: true })
    .then(goal => {
      console.log('Data updated in MongoDB')
      return goal
    })
    .catch((err: unknown) => {
      console.log(err)
    })
}
