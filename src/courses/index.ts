import createCourseController from './controllers/course-controller'
import createCourseService from './services/courses-service'
import createCourseRoutes from './courses-routes'
import createCourseStaticDB, { COURSES } from './db/static/course-db'
import createCoursesMongoDB from './db/mongo/course-mongo-db'

const courseDB = createCourseStaticDB(COURSES)

const courseService = createCourseService(courseDB)

const coursesController = createCourseController(courseService)

export const coursesRoutesWithStaticDB = createCourseRoutes(coursesController)


const courseMongoDB = createCoursesMongoDB()

const courseMongoService = createCourseService(courseMongoDB)

const coursesMongoController = createCourseController(courseMongoService)

export const coursesRoutesWithMongoDB = createCourseRoutes(coursesMongoController)

