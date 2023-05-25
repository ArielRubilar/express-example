import { NextFunction, Request, Response } from "express"
import { ParamsError } from '../../errors/custom-error'
import { CourseService } from "../services/course-services.type"
import { CourseController, ExpressRouteFunc } from './course-controller.type'
import Logger from '../../logger/logger'


const getAllCourses = (courseService: CourseService): ExpressRouteFunc => {

  return async (_: Request, res: Response, next: NextFunction) => {
    try {
      Logger.initLog('getAllCourses')
      res.send(await courseService.getAllCourse())
    } catch (e) {
      Logger.logError('getAllCourses', `${e}`)
      next(e)
    } finally {
      Logger.endLog('getAllCourses')
    }
  }
}

const getCourse = (courseService: CourseService) => {

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      Logger.initLog('getCourse')
      const id = req.params.id
      if (!id) throw new ParamsError('Invalid Params')

      res.send(await courseService.getCourse(id))
    } catch (e) {
      Logger.logError('getCourse', `${e}`)
      next(e)
    } finally {
      Logger.endLog('getCourse')
    }
  }
}

const deleteCourse = (courseService: CourseService) => {

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      Logger.initLog('deleteCourse')
      const id = req.params.id
      if (!id) throw new ParamsError('Invalid Params')

      res.status(202).send(await courseService.deleteCourse(id))
    } catch (e) {
      Logger.logError('deleteCourse', `${e}`)
      next(e)
    } finally {
      Logger.endLog('deleteCourse')
    }
  }
}

const addCourse = (courseService: CourseService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      Logger.initLog('addCourse')
      const name = req.body.name
      if (!name) throw new ParamsError('Invalid Params')

      res.status(201).send(await courseService.addCourse({ name }))
    } catch (e) {
      Logger.logError('addCourse', `${e}`)
      next(e)
    } finally {
      Logger.endLog('addCourse')
    }
  }
}

function createCourseController(courseService: CourseService): CourseController {
  return {
    getAllCourses: getAllCourses(courseService),
    getCourse: getCourse(courseService),
    deleteCourse: deleteCourse(courseService),
    addCourse: addCourse(courseService)
  }
}

export default createCourseController