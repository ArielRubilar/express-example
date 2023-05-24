
import notFoundMiddleware from './middleware/not-found'
import errorHandle from './middleware/error-handle'
import express, { Router } from 'express'


export default function server(router: Router) {

    const app = express()

    app.use(express.json())

    app.use('/api', router)

    app.use(notFoundMiddleware)
    app.use(errorHandle)

    return app
}
