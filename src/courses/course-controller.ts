import { NextFunction, Request, Response } from "express"
import { ParamsError } from '../errors/custom-error'
import courseService from './courses-service'
import Logger from './../logger/logger'
import { NewCourse } from "./course"

const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
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

const getCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Logger.initLog('getCourse')
    const id = Number(req.params.id)
    if (isNaN(id)) throw new ParamsError('Invalid Params')

    res.send(await courseService.getCourse(id))
  } catch (e) {
    Logger.logError('getCourse', `${e}`)
    next(e)
  } finally {
    Logger.endLog('getCourse')
  }
}


const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Logger.initLog('deleteCourse')
    const id = Number(req.params.id)
    if (isNaN(id)) throw new ParamsError('Invalid Params')

    res.status(202).send(await courseService.deleteCourse(id))
  } catch (e) {
    Logger.logError('deleteCourse', `${e}`)
    next(e)
  } finally {
    Logger.endLog('deleteCourse')
  }
}


const addCourse = async (req: Request<never, never, NewCourse>, res: Response, next: NextFunction) => {
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

export default {
  getAllCourses,
  getCourse,
  deleteCourse,
  addCourse
}
