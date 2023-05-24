import createCourseController from './course-controller'
import createCourseService from './courses-service'
import createCourseRoutes from './courses-routes'
import createCourseDB, { COURSES } from './course-db'

const courseDB = createCourseDB(COURSES)

const courseService = createCourseService(courseDB)

const coursesController = createCourseController(courseService)

const coursesRoutes = createCourseRoutes(coursesController)

export default coursesRoutes