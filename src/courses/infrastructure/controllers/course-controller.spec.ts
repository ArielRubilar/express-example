import { NextFunction, Request, Response } from "express"
import { getMockReq, getMockRes } from '@jest-mock/express'

import { HttpError, ParamsError } from '../../../errors/http.error'
import createCourseController from './course-controller'
import { CoursesUseCases } from "../../application/courses-use-cases.type"
import { CourseController } from "./course-controller.type"
import { Logger } from "../../../logger/logger.type"
import { CourseNotFound } from "../../application/courses.errors"

describe('CourseController', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  let courseController: CourseController
  let courseService: CoursesUseCases
  let logger: Logger

  beforeEach(() => {
    courseService = {
      getAllCourse: jest.fn(),
      getCourse: jest.fn(),
      deleteCourse: jest.fn(),
      addCourse: jest.fn(),
    }

    logger = {
      initLog: jest.fn(),
      endLog: jest.fn(),
      logError: jest.fn(),
      connect: jest.fn()
    }

    courseController = createCourseController(courseService, logger)
    req = {} as Request
    res = getMockRes().res
    next = jest.fn()
  })

  describe('getAllCourses', () => {
    it('should send all courses', async () => {
      const sut = courseController.getAllCourses

      const expected = [
        { id: '1', name: 'Velit sit adipisicing quis incididunt sint labore incididunt officia dolor occaecat duis.' },
        { id: '2', name: 'Lorem veniam labore velit duis magna cillum dolore in consequat.' },
        { id: '3', name: 'Consequat proident sunt deserunt deserunt ut tempor magna Lorem laboris non eu non Lorem.' }
      ]

      jest.spyOn(courseService, 'getAllCourse').mockResolvedValueOnce(expected)
      await sut(req, res, next)

      expect(res.send).toHaveBeenCalledWith(expected)
    })
  })

  describe('deleteCourse', () => {
    it('should send course', async () => {
      const sut = courseController.deleteCourse


      req = getMockReq({
        params: {
          id: '1'
        }
      })
      const deleteCourseSpy = jest.spyOn(courseService, 'deleteCourse')
      deleteCourseSpy.mockResolvedValueOnce()
      await sut(req, res, next)

      expect(deleteCourseSpy).toHaveBeenCalledWith('1')
      expect(res.send).toHaveBeenCalledTimes(1)
    })

    describe('param id don`t exit', () => {
      it('should next params error', async () => {
        const sut = courseController.deleteCourse

        req = {
          params: {}
        } as Request
        await sut(req, res, next)

        expect(next).toHaveBeenCalledWith(new ParamsError('Invalid Params'))
      })
    })

    describe('course  don`t exit', () => {
      it('should next params error', async () => {
        const sut = courseController.deleteCourse

        req = getMockReq()
        req.params.id = '1'
        const deleteCourseSpy = jest.spyOn(courseService, 'deleteCourse')
        deleteCourseSpy.mockRejectedValueOnce(new CourseNotFound('Not Found'))

        await sut(req, res, next)

        expect(next).toHaveBeenCalledWith(new HttpError(404, { status: 'NO OK', message: 'Not Found' }))
      })
    })


  })


  describe('getCourse', () => {
    it('should send course', async () => {
      const sut = courseController.getCourse

      const expected = { id: '1', name: 'Voluptate aliqua commodo in veniam exercitation ullamco est enim consequat.' }

      req = getMockReq({
        params: {
          id: '1'
        }
      })
      const getCourseSpy = jest.spyOn(courseService, 'getCourse')
      getCourseSpy.mockResolvedValueOnce(expected)
      await sut(req, res, next)

      expect(getCourseSpy).toHaveBeenCalledWith('1')
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

    describe('course  don`t exit', () => {
      it('should next params error', async () => {
        const sut = courseController.getCourse

        req = getMockReq()
        req.params.id = '1'
        const deleteCourseSpy = jest.spyOn(courseService, 'getCourse')
        deleteCourseSpy.mockRejectedValueOnce(new CourseNotFound('Not Found'))

        await sut(req, res, next)

        expect(next).toHaveBeenCalledWith(new HttpError(404, { status: 'NO OK', message: 'Not Found' }))
      })
    })

  })


  describe('addCourse', () => {
    it('should send new course', async () => {
      const sut = courseController.addCourse

      const newCourse = { id: '1', name: 'Voluptate aliqua commodo in veniam exercitation ullamco est enim consequat.' }

      req = getMockReq({
        body: {
          name: 'test'
        }
      })
      const addCourseSpy = jest.spyOn(courseService, 'addCourse')
      addCourseSpy.mockResolvedValueOnce(newCourse)

      await sut(req, res, next)

      expect(addCourseSpy).toHaveBeenCalledWith({ name: 'test' })
      expect(res.send).toHaveBeenCalledWith(newCourse)
    })

    describe('body  don`t have name', () => {
      it('should next params error', async () => {
        const sut = courseController.addCourse

        req = {
          body: {}
        } as Request

        await sut(req, res, next)

        expect(next).toHaveBeenCalledWith(new ParamsError('Invalid Params'))
      })
    })

  })
})
