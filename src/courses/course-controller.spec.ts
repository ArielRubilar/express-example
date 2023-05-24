import { NextFunction, Request, Response } from "express"
import { getMockReq, getMockRes } from '@jest-mock/express'

import { ParamsError } from '../errors/custom-error'
import createCourseController, { CourseController } from './course-controller'
import { CourseService } from './courses-service'

describe('CourseController', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  let courseController: CourseController
  let courseService: CourseService

  beforeEach(() => {
    courseService = {
      getAllCourse: jest.fn(),
      getCourse: jest.fn(),
      deleteCourse: jest.fn(),
      addCourse: jest.fn(),
    }

    courseController = createCourseController(courseService)
    req = {} as Request
    res = getMockRes().res
    next = jest.fn()
  })

  describe('getAllCourses', () => {
    it('should send all courses', async () => {
      const sut = courseController.getAllCourses

      const expected = [
        { id: 1, name: 'Velit sit adipisicing quis incididunt sint labore incididunt officia dolor occaecat duis.' },
        { id: 2, name: 'Lorem veniam labore velit duis magna cillum dolore in consequat.' },
        { id: 3, name: 'Consequat proident sunt deserunt deserunt ut tempor magna Lorem laboris non eu non Lorem.' }
      ]

      jest.spyOn(courseService, 'getAllCourse').mockResolvedValueOnce(expected)
      await sut(req, res, next)

      expect(res.send).toHaveBeenCalledWith(expected)
    })
  })

  describe('getCourse', () => {
    it('should send course', async () => {
      const sut = courseController.getCourse

      const expected = { id: 1, name: 'Voluptate aliqua commodo in veniam exercitation ullamco est enim consequat.' }

      req = getMockReq({
        params: {
          id: '1'
        }
      })
      const getCourseSpy = jest.spyOn(courseService, 'getCourse')
      getCourseSpy.mockResolvedValueOnce(expected)
      await sut(req, res, next)

      expect(getCourseSpy).toHaveBeenCalledWith(1)
      expect(res.send).toHaveBeenCalledWith(expected)
    })

    describe('param id don`t exit', () => {
      it('should next params error', async () => {
        const sut = courseController.getCourse

        req = {
          params: {}
        } as Request
        await sut(req, res, next)

        expect(next).toHaveBeenCalledWith(new ParamsError('Invalid Params'))
      })
    })

    describe('param id is not a number', () => {
      it('should next params error', async () => {
        const sut = courseController.getCourse

        req = getMockReq({
          params: {
            id: 'ID'
          }
        })
        await sut(req, res, next)

        expect(next).toHaveBeenCalledWith(new ParamsError('Invalid Params'))
      })
    })
  })
})
