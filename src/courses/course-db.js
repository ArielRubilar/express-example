const courses = [

  { id: 1, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 2, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 3, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 4, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 5, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' },
  { id: 6, name: 'Mollit nostrud aliquip enim incididunt sint tempor nisi aute consectetur ex ex tempor velit.' }
]

const getAllCourses = async () => courses

const findCourseById = async (id) => {
  const course = courses.find(course => course.id === id)
  return course
}

module.exports = {
  getAllCourses,
  findCourseById
}
