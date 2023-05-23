const { BusinessError } = require('../errors/custom-error')
const courseDb = require('./course-db')

const getAllCourse = async () => {
  return await courseDb.getAllCourses()
}

const getCourse = async (id) => {
  const course = await courseDb.findCourseById(id)
  if (!course) throw new BusinessError('Not Found', 404)
  return course
}

module.exports = {
  getAllCourse,
  getCourse
}
