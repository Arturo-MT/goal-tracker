import mongoose from 'mongoose'
import { config } from 'dotenv'

config()

const connectionString: string =
  process.env.NODE_ENV === 'test'
    ? (process.env.MongoDB_URI_Test as string)
    : (process.env.MongoDB_URI as string)

export const dbConnect = async (): Promise<any> => {
  return await mongoose
    .connect(connectionString)
    .then(() => {
      console.log('Database connected')
    })
    .catch(err => {
      console.error(err)
    })
}

export const dbDisconnect = async (): Promise<any> => {
  return await mongoose
    .disconnect()
    .then(() => {
      console.log('Database disconnected')
    })
    .catch(err => {
      console.error(err)
    })
}

/* A listener for uncaught exceptions. */
process.on('uncaughtException', error => {
  console.error(error)
  mongoose
    .disconnect()
    .then(() => {
      process.exit(1)
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
})
