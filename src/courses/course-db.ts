import { Course, NewCourse } from "./course"

let courses = [

  { id: 1, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 2, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 3, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 4, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 5, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 6, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' }
]

function getLastId(): number {
  return courses.map(course => course.id).sort((a, b) => b - a)[0]
}

const getAllCourses = async () => courses

const findCourseById = async (id: number) => {
  const course = courses.find(course => course.id === id)
  return course
}

const deleteCourseById = async (id: number): Promise<void> => {
  courses = courses.filter(course => course.id !== id)
}

const addCourse = async (newCourse: NewCourse): Promise<Course> => {
  const id = getLastId() + 1
  const course = { ...newCourse, id }
  courses = [...courses, course]
  return course
}

export default {
  getAllCourses,
  findCourseById,
  deleteCourseById,
  addCourse
}
