import express, { json } from 'express'
import morgan from 'morgan'

//importing routes
import projectRoutes from './routes/project'
import taskRoutes from './routes/tasks'

//inicialization
const app = express()

//middleware
app.use(morgan('dev'))  //meuestra en consola las request que nos van llegando
app.use(json())

//routes
app.use('/api/projects',projectRoutes)
app.use('/api/task',taskRoutes)

export default app