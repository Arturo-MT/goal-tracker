import express from 'express'

const router = express.Router()

router.get('/', (_req, res) =>
  res.send('Users')
)

router.get('/:id', (req, res) =>
  res.send(`User ${req.params.id}`)
)

export default router