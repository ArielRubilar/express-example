import express from 'express'
import { coursesRoutesWithMongoDB } from '../../courses/infrastructure'

const coursesRouter = express.Router()
coursesRouter.use('/v2/courses', coursesRoutesWithMongoDB)

export default coursesRouter