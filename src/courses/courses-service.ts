import { BusinessError } from '../errors/custom-error'
import { Course } from './course'
import courseDb from './course-db'

const getAllCourse = async (): Promise<Course[]> => {
  return await courseDb.getAllCourses()
}

const getCourse = async (id: number): Promise<Course> => {
  const course = await courseDb.findCourseById(id)
  if (!course) throw new BusinessError('Not Found', 404)
  return course
}

export default {
  getAllCourse,
  getCourse
}
