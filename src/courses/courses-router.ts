
import express from 'express'
import courseController from './course-controller'
const coursesRouter = express.Router()

coursesRouter.get('/', courseController.getAllCourses)

coursesRouter.get('/:id', courseController.getCourse)

coursesRouter.delete('/:id', courseController.deleteCourse)

coursesRouter.post('/', courseController.addCourse)

export default coursesRouter
