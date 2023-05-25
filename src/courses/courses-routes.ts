
import express, { Router } from 'express'
import { CourseController } from './controllers/course-controller.type'

export default function createCourseRoutes(courseController: CourseController): Router {
    const coursesRoutes = express.Router()

    coursesRoutes.get('/', courseController.getAllCourses)

    coursesRoutes.get('/:id', courseController.getCourse)

    coursesRoutes.delete('/:id', courseController.deleteCourse)

    coursesRoutes.post('/', courseController.addCourse)

    return coursesRoutes
}
