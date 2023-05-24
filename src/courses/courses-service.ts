import { BusinessError } from '../errors/custom-error'
import { Course, NewCourse } from './course'
import courseDb from './course-db'

const getAllCourse = async (): Promise<Course[]> => {
  return await courseDb.getAllCourses()
}

const getCourse = async (id: number): Promise<Course> => {
  const course = await courseDb.findCourseById(id)
  if (!course) throw new BusinessError('Not Found', 404)
  return course
}


const deleteCourse = async (id: number): Promise<void> => {
  const course = await courseDb.findCourseById(id)
  if (!course) throw new BusinessError('Not Found', 404)
  await courseDb.deleteCourseById(id)
}

const addCourse = async (newCourse: NewCourse): Promise<Course> => {
  const course = await courseDb.addCourse(newCourse)
  return course
}


export default {
  getAllCourse,
  getCourse,
  deleteCourse,
  addCourse
}
