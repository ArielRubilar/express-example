import { Course, NewCourse } from "./course"

export const COURSES = [

  { id: 1, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 2, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 3, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 4, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 5, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 6, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' }
]

export interface CourseDB {
  addCourse: (newCourse: NewCourse) => Promise<Course>,
  deleteCourseById: (id: number) => Promise<void>,
  findCourseById: (id: number) => Promise<Course | undefined>
  getAllCourses: () => Promise<Course[]>
}

function getLastId(courses: Course[]): number {
  return courses.map(course => course.id).sort((a, b) => b - a)[0]
}

export default function createCourseDB(data: Course[] = COURSES): CourseDB {

  let courses = data.map(course => ({ ...course }))

  const getAllCourses = async () => courses

  const findCourseById = async (id: number) => {
    const course = courses.find(course => course.id === id)
    return course
  }

  const deleteCourseById = async (id: number): Promise<void> => {
    courses = courses.filter(course => course.id !== id)
  }

  const addCourse = async (newCourse: NewCourse): Promise<Course> => {
    const id = getLastId(courses) + 1
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
