import { Status } from './enums'

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
