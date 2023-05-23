const express = require('express')

const router = express.Router()

const Logger = require('./logger/logger')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandle = require('./middleware/error-handle')

Logger.connect(console.log)

const coursesRouter = require('./courses/courses-router')

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
