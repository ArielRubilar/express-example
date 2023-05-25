import { Course, NewCourse } from "../../../domain/course.type"
import { CourseRepository } from "../../../domain/course.repository"

export const COURSES = [
  { id: '1', name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: '2', name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: '3', name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: '4', name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: '5', name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: '6', name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' }
]


function getLastId(courses: Course[]): number {
  return courses.map(course => Number(course.id)).sort((a, b) => b - a)[0]
}

export default function createCourseStaticRepository(data: Course[] = COURSES): CourseRepository {

  let courses = data.map(course => ({ ...course }))

  const getAllCourses = async () => courses

  const findCourseById = async (id: string) => {
    const course = courses.find(course => course.id === id)
    return course || null
  }

  const deleteCourseById = async (id: string): Promise<void> => {
    courses = courses.filter(course => course.id !== id)
  }

  const addCourse = async (newCourse: NewCourse): Promise<Course> => {
    const id = `${getLastId(courses) + 1}`
    const course = { ...newCourse, id }
    courses = [...courses, course]
    return course
  }

  return ({
    getAllCourses,
    findCourseById,
    deleteCourseById,
    addCourse
  })
}
