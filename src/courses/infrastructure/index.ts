import createCourseController from './controllers/course-controller'
import createCourseUseCases from '../application/courses-use-cases'
import createCoursesRoutes from './courses-routes'
import createCourseStaticRepository, { COURSES } from './db/static/course-static-repository'
import createCoursesMongoRepository from './db/mongo/course-mongo-repository'
import Logger from '../../logger/logger'

const courseDB = createCourseStaticRepository(COURSES)

const courseService = createCourseUseCases(courseDB)

const coursesController = createCourseController(courseService, Logger)

export const coursesRoutesWithStaticDB = createCoursesRoutes(coursesController)


const courseMongoDB = createCoursesMongoRepository()

const courseMongoService = createCourseUseCases(courseMongoDB)

const coursesMongoController = createCourseController(courseMongoService, Logger)

export const coursesRoutesWithMongoDB = createCoursesRoutes(coursesMongoController)

