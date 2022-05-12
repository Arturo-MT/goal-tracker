import { Schema, model } from 'mongoose'

const goalSchema = new Schema({
  id: String,
  name: String,
  description: String,
  date: String,
  status: String,
  owner: String,
  progress: [
    {
      day: Number,
      date: String,
      value: Number,
      extra: Boolean
    }
  ]
})

goalSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    for (let i = 0; i < returnedObject.progress.length; i++) {
      returnedObject.progress[i].id = returnedObject.progress[i].day
      delete returnedObject.progress[i]._id
    }
  }
})

export const Goall = model('Goal', goalSchema)

/* export const goal = new Goall({
  name: 'test',
  description: 'test',
  date: new Date(),
  status: 'active',
  owner: 'test',
  progress: [
    {
      day: 1,
      value: 1,
      extra: false
    }
  ]
}) */
