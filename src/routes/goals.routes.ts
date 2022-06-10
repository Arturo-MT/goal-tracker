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
    .then(goal => {
      res.send(goal)
    })
    .catch(err => {
      res.status(404).send(err.message)
      next(err)
    })
})

router.post('/', (req, res, next) => {
  goalServices
    .addGoal(req.body)
    .then(goal => res.json(goal).status(201))
    .catch(err => next(err))

  if (req.body.name === undefined || req.body.description === undefined) {
    res.status(400).send({
      message: 'Missing Something'
    })
  }
})

router.delete('/:id', (req, res, next) => {
  goalServices
    .deleteGoal(req.params.id)
    .then(goal => res.status(200).send(goal.name + ' has been deleted'))
    .catch(err => {
      res.status(404).send(err.message)
      next(err)
    })
})

router.put('/:id', (req, res, next) => {
  goalServices
    .updateGoal(req.params.id, req.body)
    .then(goal => res.json(goal))
    .catch(err => next(err))

  if (req.body.name === undefined || req.body.description === undefined) {
    res.status(400).send({
      message: 'Missing Something'
    })
  }
})

export default router
