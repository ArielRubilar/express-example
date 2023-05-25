import { BusinessError } from '../../errors/custom-error'
import { Course, NewCourse } from '../course.type'
import { CourseDB } from '../db/db.types'
import { CourseService } from './course-services.type'

export default function createCourseService(courseDB: CourseDB): CourseService {

  const getAllCourse = async (): Promise<Course[]> => {
    return await courseDB.getAllCourses()
  }

  const getCourse = async (id: string): Promise<Course> => {
    const course = await courseDB.findCourseById(id)
    if (!course) throw new BusinessError('Not Found', 404)
    return course
  }

  const deleteCourse = async (id: string): Promise<void> => {
    const course = await courseDB.findCourseById(id)
    if (!course) throw new BusinessError('Not Found', 404)
    await courseDB.deleteCourseById(id)
  }

  const addCourse = async (newCourse: NewCourse): Promise<Course> => {
    const course = await courseDB.addCourse(newCourse)
    return course
  }

  return {
    getAllCourse,
    getCourse,
    deleteCourse,
    addCourse
  }
}

