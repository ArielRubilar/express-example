import express from 'express'
import Logger from './logger/logger'
import notFoundMiddleware from './middleware/not-found'
import errorHandle from './middleware/error-handle'
import coursesRouter from './courses/courses-router'

const router = express.Router()



Logger.connect(console.log)


const app = express()

app.use(express.json())

router.use('/courses', coursesRouter)

app.use('/api', router)
app.use(notFoundMiddleware)
app.use(errorHandle)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 app listening on port ${PORT}`)
})
