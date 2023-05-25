import { Course, NewCourse } from '../domain/course.type'
import { CourseRepository } from '../domain/course.repository'
import { CoursesUseCases } from './courses-use-cases.type'
import { CourseNotFound } from './courses.errors'

export default function createCourseUseCases(courseRepository: CourseRepository): CoursesUseCases {

  const getAllCourse = async (): Promise<Course[]> => {
    return await courseRepository.getAllCourses()
  }

  const getCourse = async (id: string): Promise<Course> => {
    const course = await courseRepository.findCourseById(id)
    if (!course) throw new CourseNotFound(`Course(${id}) not found!`)
    return course
  }

  const deleteCourse = async (id: string): Promise<void> => {
    const course = await courseRepository.findCourseById(id)
    if (!course) throw new CourseNotFound(`Course(${id}) not found!`)
    await courseRepository.deleteCourseById(id)
  }

  const addCourse = async (newCourse: NewCourse): Promise<Course> => {
    const course = await courseRepository.addCourse(newCourse)
    return course
  }

  return {
    getAllCourse,
    getCourse,
    deleteCourse,
    addCourse
  }
}

