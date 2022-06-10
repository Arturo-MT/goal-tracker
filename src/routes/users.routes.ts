import express from 'express'
import * as usersServices from '../services/usersServices'
import { PublicUser } from '../types'

const router = express.Router()

router.post('/', (req, res, next) => {
  const user = req.body
  usersServices
    .createUser(user)
    .then((user: PublicUser) => res.json(user).status(201))
    .catch(err => next(err))
  if (user.userName === undefined || user.passwordHash === undefined) {
    res.status(400).send({
      message: 'Missing Something'
    })
  }
})

router.get('/', (_req, res) => {
  usersServices
    .getUsers()
    .then((users: PublicUser[]) => res.json(users))
    .catch(err => {
      res.status(400).send(err.message)
    })
})

router.get('/:id', (req, res) => res.send(`User ${req.params.id}`))

export default router
