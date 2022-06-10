import { Status } from './enums'

export interface IUser {
  id: string
  userName: string
  name: string
  passwordHash: string
  goals: string[]
}

export interface Goal {
  id: string
  name: string
  description: string
  date: string
  status: Status
  owner: string
  progress: [
    {
      day: number
      date: string
      value: number
      extra: boolean
    }
  ]
}

export type NonStatusGoal = Omit<Goal, 'status'>

export type NewGoalEntry = Goal

export type PublicUser = Omit<IUser, 'passwordHash'>
