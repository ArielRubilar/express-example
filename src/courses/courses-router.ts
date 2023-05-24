
import express, { Router } from 'express'
import { CourseController } from './course-controller'

export default function createCourseRouter(courseController: CourseController): Router {
    const coursesRouter = express.Router()

    coursesRouter.get('/', courseController.getAllCourses)

    coursesRouter.get('/:id', courseController.getCourse)

    coursesRouter.delete('/:id', courseController.deleteCourse)

    coursesRouter.post('/', courseController.addCourse)

    return coursesRouter
}
