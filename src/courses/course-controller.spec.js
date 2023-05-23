const { ParamsError } = require('../errors/custom-error')
const CoursesController = require('./course-controller')

const CourseService = require('./courses-service')

describe('CourseController', () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = {}
    res = {
      send: jest.fn()
    }
    next = jest.fn()
  })

  describe('getAllCourses', () => {
    it('should send all courses', async () => {
      const sut = CoursesController.getAllCourses

      const expected = [{}, {}, {}]

      jest.spyOn(CourseService, 'getAllCourse').mockResolvedValueOnce(expected)
      await sut(req, res, next)

      expect(res.send).toHaveBeenCalledWith(expected)
    })
  })

  describe('getCourse', () => {
    it('should send course', async () => {
      const sut = CoursesController.getCourse

      const expected = { id: 1, name: 'Voluptate aliqua commodo in veniam exercitation ullamco est enim consequat.' }

      req = {
        params: {
          id: '1'
        }
      }

      const getCourseSpy = jest.spyOn(CourseService, 'getCourse')
      getCourseSpy.mockResolvedValueOnce(expected)
      await sut(req, res, next)

      expect(getCourseSpy).toHaveBeenCalledWith(1)
      expect(res.send).toHaveBeenCalledWith(expected)
    })

    describe('param id don`t exit', () => {
      it('should next params error', async () => {
        const sut = CoursesController.getCourse

        req = {
          params: {}
        }
        await sut(req, res, next)

        expect(next).toHaveBeenCalledWith(new ParamsError('Invalid Params'))
      })
    })

    describe('param id is not a number', () => {
      it('should next params error', async () => {
        const sut = CoursesController.getCourse

        req = {
          params: {
            id: 'ID'
          }
        }
        await sut(req, res, next)

        expect(next).toHaveBeenCalledWith(new ParamsError('Invalid Params'))
      })
    })
  })
})
