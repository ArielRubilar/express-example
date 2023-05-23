const CourseService = require('./courses-service')
const courseDb = require('./course-db')
const { BusinessError } = require('../errors/custom-error')

describe('CoursesServices', () => {
  describe('getAllCourse', () => {
    it('should return 5 courses', async () => {
      const sut = CourseService.getAllCourse
      const expected = [{}, {}, {}, {}, {}]

      jest.spyOn(courseDb, 'getAllCourses').mockResolvedValueOnce(expected)
      const actual = await sut()

      expect(actual).toHaveLength(5)
    })
  })

  describe('getCourse', () => {
    describe('if course id exist', () => {
      it('should return one course', async () => {
        const sut = CourseService.getCourse
        const expected = { id: 1, name: 'Pariatur fugiat pariatur eiusmod consequat amet est do quis laboris.' }

        jest.spyOn(courseDb, 'findCourseById').mockResolvedValueOnce(expected)
        const actual = await sut()

        expect(actual).toBe(expected)
      })
    })

    describe('if course id  don`t exit', () => {
      it('should throw business error', async () => {
        const sut = CourseService.getCourse

        jest.spyOn(courseDb, 'findCourseById').mockResolvedValueOnce(null)

        try {
          await sut()
        } catch (e) {
          expect(e).toBeInstanceOf(BusinessError)
          expect(e.message).toBe('Not Found')
        }
      })
    })
  })
})
