import createCourseController from './course-controller'
import createCourseService from './courses-service'
import createCourseRouter from './courses-router'
import createCourseDB, { COURSES } from './course-db'

const courseDB = createCourseDB(COURSES)

const courseService = createCourseService(courseDB)

const coursesController = createCourseController(courseService)

const coursesRouter = createCourseRouter(coursesController)

export default coursesRouter