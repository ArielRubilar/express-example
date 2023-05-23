import { NextFunction, Request, Response } from "express"

import { ParamsError } from '../errors/custom-error'
import courseService from './courses-service'
import Logger from './../logger/logger'

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

export default {
  getAllCourses,
  getCourse
}
