import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  id: String,
  userName: String,
  name: String,
  passwordHash: String,
  goals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Goal'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

export const User = model('User', userSchema)
