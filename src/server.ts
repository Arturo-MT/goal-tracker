import app from './app'
import { config } from 'dotenv'

config()

const PORT: string | number = process.env.PORT as string

const server = app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)
})

export default server
