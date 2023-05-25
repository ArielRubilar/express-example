import { NextFunction, Request, Response } from "express"
import { HttpError, ParamsError } from '../../../errors/http.error'
import { CoursesUseCases } from "../../application/courses-use-cases.type"
import { CourseController } from './course-controller.type'
import { Logger } from "../../../logger/logger.type"
import { CourseNotFound } from "../../application/courses.errors"

function createCourseController(courseService: CoursesUseCases, logger: Logger): CourseController {

  const getAllCourses = async (_: Request, res: Response, next: NextFunction) => {
    try {
      logger.initLog('getAllCourses')
      res.send(await courseService.getAllCourse())
    } catch (e) {
      logger.logError('getAllCourses', `${e}`)
      next(e)
    } finally {
      logger.endLog('getAllCourses')
    }

  }

  const getCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.initLog('getCourse')
      const id = req.params.id
      if (!id) throw new ParamsError('Invalid Params')

      res.send(await courseService.getCourse(id))
    } catch (e) {

      if (e instanceof CourseNotFound) return next(new HttpError(404, { status: e.status, message: e.message }))
      logger.logError('getCourse', `${e}`)
      next(e)
    } finally {
      logger.endLog('getCourse')
    }

  }

  const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.initLog('deleteCourse')
      const id = req.params.id
      if (!id) throw new ParamsError('Invalid Params')

      res.status(202).send(await courseService.deleteCourse(id))
    } catch (e) {

      if (e instanceof CourseNotFound) return next(new HttpError(404, { status: e.status, message: e.message }))
      logger.logError('deleteCourse', `${e}`)
      next(e)
    } finally {
      logger.endLog('deleteCourse')
    }

  }

  const addCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.initLog('addCourse')
      const name = req.body.name
      if (!name) throw new ParamsError('Invalid Params')

      res.status(201).send(await courseService.addCourse({ name }))
    } catch (e) {
      logger.logError('addCourse', `${e}`)
      next(e)
    } finally {
      logger.endLog('addCourse')
    }
  }

  return {
    getAllCourses,
    getCourse,
    deleteCourse,
    addCourse
  }
}

export default createCourseController