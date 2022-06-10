import express from 'express'
import cors from 'cors'

import goalsRouter from './routes/goals.routes'
import usersRouter from './routes/users.routes'
import notFound from './middleware/notFound'
import errorHandler from './middleware/errorHandler'
import './db/db'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/goals', goalsRouter)
app.use('/api/users', usersRouter)

app.get('/', (_, res) => {
  res.send('Welcome to the API')
})

app.use(notFound)
app.use(errorHandler)

export default app
