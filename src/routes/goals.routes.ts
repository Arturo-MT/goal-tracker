import express from 'express'
import * as goalServices from '../services/goalsServices'

const router = express.Router()

router.get('/', (_req, res, next) => {
  goalServices
    .getAllGoals()
    .then(goals => res.send(goals))
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  goalServices
    .getGoalById(req.params.id)
    .then(goal => res.send(goal))
    .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  if (req.body.name === undefined && req.body.description === undefined) {
    res.send('Missing Something').status(400)
  }
  goalServices
    .addGoal(req.body)
    .then(goal => res.json(goal).status(201))
    .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  if (req.body.name === undefined && req.body.description === undefined) {
    res.send('Missing Something').status(400)
  }

  goalServices
    .deleteGoal(req.params.id)
    .then(goal => res.status(204).send(goal.name + ' has been deleted'))
    .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  if (req.body.name === undefined && req.body.description === undefined) {
    res.send('Missing Something').status(400)
  }

  goalServices
    .updateGoal(req.params.id, req.body)
    .then(goal => res.json(goal))
    .catch(err => next(err))
})

export default router
