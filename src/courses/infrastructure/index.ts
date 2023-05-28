import createCourseController from './controllers/course-controller'
import createCourseUseCases from '../application/courses-use-cases'
import createCoursesRoutes from './courses-routes'
import createCourseStaticRepository, { COURSES } from './db/static/course-static-repository'
import createCoursesMongoDB from './db/mongo/course-mongo-repository'
import Logger from '../../logger/logger'
import createCoursesMongoRepository from './db/mongo/course-adapter'

const courseDB = createCourseStaticRepository(COURSES)

const courseService = createCourseUseCases(courseDB)

const coursesController = createCourseController(courseService, Logger)

export const coursesRoutesWithStaticDB = createCoursesRoutes(coursesController)


const courseMongoDB = createCoursesMongoDB()

const courseRepository = createCoursesMongoRepository(courseMongoDB)

const courseMongoService = createCourseUseCases(courseRepository)

const coursesMongoController = createCourseController(courseMongoService, Logger)

export const coursesRoutesWithMongoDB = createCoursesRoutes(coursesMongoController)

