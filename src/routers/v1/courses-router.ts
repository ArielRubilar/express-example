import express from 'express'
import coursesRoutes from '../../courses'

const coursesRouter = express.Router()
coursesRouter.use('/v1/courses', coursesRoutes)

export default coursesRouter