import { CourseRepository } from "../domain/course.repository"
import { CoursesUseCases } from "./courses-use-cases.type"
import createCourseUseCases from "./courses-use-cases"
import { CourseNotFound } from "./courses.errors"

describe('CoursesServices', () => {

  let courseService: CoursesUseCases
  let courseDB: CourseRepository

  beforeEach(() => {
    courseDB = {
      addCourse: jest.fn(),
      deleteCourseById: jest.fn(),
      getAllCourses: jest.fn(),
      findCourseById: jest.fn()
    }
    courseService = createCourseUseCases(courseDB)
  })

  describe('getAllCourse', () => {
    it('should return 5 courses', async () => {
      const sut = courseService.getAllCourse
      const expected = [
        { id: '1', name: 'Quis deserunt ea aliquip officia do non in tempor ex culpa non ad excepteur.' },
        { id: '2', name: 'Quis deserunt ea aliquip officia do non in tempor ex culpa non ad excepteur.' },
        { id: '3', name: 'Quis deserunt ea aliquip officia do non in tempor ex culpa non ad excepteur.' },
        { id: '4', name: 'Quis deserunt ea aliquip officia do non in tempor ex culpa non ad excepteur.' },
        { id: '5', name: 'Quis deserunt ea aliquip officia do non in tempor ex culpa non ad excepteur.' },
      ]

      jest.spyOn(courseDB, 'getAllCourses').mockResolvedValueOnce(expected)
      const actual = await sut()

      expect(actual).toHaveLength(5)
    })
  })

  describe('getCourse', () => {
    describe('if course id exist', () => {
      it('should return one course', async () => {
        const sut = courseService.getCourse
        const expected = { id: '1', name: 'Pariatur fugiat pariatur eiusmod consequat amet est do quis laboris.' }

        jest.spyOn(courseDB, 'findCourseById').mockResolvedValueOnce(expected)
        const actual = await sut('9999')

        expect(actual).toBe(expected)
      })
    })

    describe('if course id  don`t exit', () => {
      it('should throw business error', async () => {
        const sut = courseService.getCourse

        jest.spyOn(courseDB, 'findCourseById').mockResolvedValueOnce(null)

        try {
          await sut('231312')
        } catch (e) {
          expect(e).toBeInstanceOf(CourseNotFound)
          expect((e as CourseNotFound).message).toBe('Course(231312) not found!')
        }
      })
    })
  })

  describe('deleteCourse', () => {
    describe('if course id exist', () => {
      it('should return delete course', async () => {
        const sut = courseService.deleteCourse

        const course = { id: '1', name: 'Pariatur fugiat pariatur eiusmod consequat amet est do quis laboris.' }
        jest.spyOn(courseDB, 'findCourseById').mockResolvedValueOnce(course)

        const deleteCourse = jest.spyOn(courseDB, 'deleteCourseById')
        await sut('1')

        expect(deleteCourse).toBeCalledWith('1')
      })
    })

    describe('if course id  don`t exit', () => {
      it('should throw business error', async () => {
        const sut = courseService.deleteCourse

        jest.spyOn(courseDB, 'findCourseById').mockResolvedValueOnce(null)

        try {
          await sut('2313123')
        } catch (e) {
          expect(e).toBeInstanceOf(CourseNotFound)
          expect((e as CourseNotFound).message).toBe('Course(2313123) not found!')
        }
      })
    })
  })

  describe('addCourse', () => {
    it('should return new Course', async () => {
      const sut = courseService.addCourse
      const newCourse = { name: 'test' }
      jest.spyOn(courseDB, 'addCourse').mockResolvedValueOnce({ ...newCourse, id: '1' })

      const expected = await sut(newCourse)

      expect(expected).toHaveProperty('id', '1')

    })
  })
})
