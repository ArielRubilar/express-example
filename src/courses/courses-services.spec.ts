import CourseService from './courses-service'
import courseDb from './course-db'
import { BusinessError } from '../errors/custom-error'

describe('CoursesServices', () => {
  describe('getAllCourse', () => {
    it('should return 5 courses', async () => {
      const sut = CourseService.getAllCourse
      const expected = [
        { id: 1, name: 'Quis deserunt ea aliquip officia do non in tempor ex culpa non ad excepteur.' },
        { id: 2, name: 'Quis deserunt ea aliquip officia do non in tempor ex culpa non ad excepteur.' },
        { id: 3, name: 'Quis deserunt ea aliquip officia do non in tempor ex culpa non ad excepteur.' },
        { id: 4, name: 'Quis deserunt ea aliquip officia do non in tempor ex culpa non ad excepteur.' },
        { id: 5, name: 'Quis deserunt ea aliquip officia do non in tempor ex culpa non ad excepteur.' },
      ]

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
        const actual = await sut(99999)

        expect(actual).toBe(expected)
      })
    })

    describe('if course id  don`t exit', () => {
      it('should throw business error', async () => {
        const sut = CourseService.getCourse

        jest.spyOn(courseDb, 'findCourseById').mockResolvedValueOnce(undefined)

        try {
          await sut(2313123)
        } catch (e) {
          expect(e).toBeInstanceOf(BusinessError)
          expect((e as BusinessError).message).toBe('Not Found')
        }
      })
    })
  })
})
