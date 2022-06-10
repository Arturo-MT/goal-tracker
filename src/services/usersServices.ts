import { IUser, PublicUser } from '../types'
import * as db from '../db/db'
import { User } from '../models/User'
import bcrypt from 'bcrypt'

export const createUser = async (user: IUser): Promise<IUser> => {
  await db.dbConnect()

  if (user.userName === undefined || user.passwordHash === undefined) {
    return await Promise.reject(new Error('Missing Something'))
  }

  const passwordHash = await bcrypt.hash(user.passwordHash, 10)

  const newUser = new User({
    id: user.id,
    userName: user.userName,
    passwordHash: passwordHash,
    goals: user.goals
  })

  return newUser.save().then(async (user: IUser) => {
    console.log('Data saved to MongoDB')
    await db.dbDisconnect()
    return user as PublicUser
  })
}

export const getUsers = async (): Promise<PublicUser[]> => {
  await db.dbConnect()
  return await User.find({})
    .then(async (users: PublicUser[]) => {
      console.log('Data aquired from MongoDB')
      return users
    })
    .catch(async err => {
      return await Promise.reject(new Error(err))
    })
}
