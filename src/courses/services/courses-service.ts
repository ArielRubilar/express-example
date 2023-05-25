import { BusinessError } from '../../errors/custom-error'
import { Course, NewCourse } from '../course.type'
import { CourseDB } from '../db/db.types'
import { CourseService } from './course-services.type'

const getAllCourse = (courseDB: CourseDB) => async (): Promise<Course[]> => {
  return await courseDB.getAllCourses()
}

const getCourse = (courseDB: CourseDB) => async (id: string): Promise<Course> => {
  const course = await courseDB.findCourseById(id)
  if (!course) throw new BusinessError('Not Found', 404)
  return course
}


const deleteCourse = (courseDB: CourseDB) => async (id: string): Promise<void> => {
  const course = await courseDB.findCourseById(id)
  if (!course) throw new BusinessError('Not Found', 404)
  await courseDB.deleteCourseById(id)
}

const addCourse = (courseDB: CourseDB) => async (newCourse: NewCourse): Promise<Course> => {
  const course = await courseDB.addCourse(newCourse)
  return course
}

export default function createCourseService(courseDB: CourseDB): CourseService {
  return {
    getAllCourse: getAllCourse(courseDB),
    getCourse: getCourse(courseDB),
    deleteCourse: deleteCourse(courseDB),
    addCourse: addCourse(courseDB)
  }
}

