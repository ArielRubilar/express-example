import express from 'express'
import { coursesRoutesWithStaticDB } from '../../courses/infrastructure'

const coursesRouter = express.Router()
coursesRouter.use('/v1/courses', coursesRoutesWithStaticDB)

export default coursesRouter