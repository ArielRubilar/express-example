import express from 'express'
import { coursesRoutesWithStaticDB } from '../../courses'

const coursesRouter = express.Router()
coursesRouter.use('/v1/courses', coursesRoutesWithStaticDB)

export default coursesRouter