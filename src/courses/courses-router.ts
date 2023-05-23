
import express from 'express'
import courseController from './course-controller'
const coursesRouter = express.Router()

coursesRouter.get('/', courseController.getAllCourses)

coursesRouter.get('/:id', courseController.getCourse)

export default coursesRouter
