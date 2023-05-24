
import notFoundMiddleware from './middleware/not-found'
import errorHandle from './middleware/error-handle'
import express from 'express'
import coursesRouter from './courses'

export default function server() {

    const router = express.Router()

    const app = express()

    app.use(express.json())

    router.use('/courses', coursesRouter)

    app.use('/api', router)
    app.use(notFoundMiddleware)
    app.use(errorHandle)

    return app
}
