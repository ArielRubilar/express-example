import { BusinessError } from '../errors/custom-error'
import { Course, NewCourse } from './course'
import { CourseDB } from './course-db'

export interface CourseService {
  getAllCourse: () => Promise<Course[]>,
  getCourse: (id: number) => Promise<Course>,
  deleteCourse: (id: number) => Promise<void>,
  addCourse: (newCourse: NewCourse) => Promise<Course>
}

const getAllCourse = (courseDB: CourseDB) => async (): Promise<Course[]> => {
  return await courseDB.getAllCourses()
}

const getCourse = (courseDB: CourseDB) => async (id: number): Promise<Course> => {
  const course = await courseDB.findCourseById(id)
  if (!course) throw new BusinessError('Not Found', 404)
  return course
}


const deleteCourse = (courseDB: CourseDB) => async (id: number): Promise<void> => {
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

