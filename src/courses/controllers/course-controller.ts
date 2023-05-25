import { NextFunction, Request, Response } from "express"
import { ParamsError } from '../../errors/custom-error'
import { CourseService } from "../services/course-services.type"
import { CourseController } from './course-controller.type'
import { Logger } from "../../logger/logger.type"

function createCourseController(courseService: CourseService, logger: Logger): CourseController {

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