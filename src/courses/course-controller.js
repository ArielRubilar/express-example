const { ParamsError } = require('../errors/custom-error')
const courseService = require('./courses-service')
const Logger = require('./../logger/logger')

const getAllCourses = async (req, res, next) => {
  try {
    Logger.initLog('getAllCourses')
    res.send(await courseService.getAllCourse())
  } catch (e) {
    Logger.logError('getAllCourses', e)
    next(e)
  } finally {
    Logger.endLog('getAllCourses')
  }
}

const getCourse = async (req, res, next) => {
  try {
    Logger.initLog('getCourse')
    const id = Number(req.params.id)
    if (isNaN(id)) throw new ParamsError('Invalid Params')

    res.send(await courseService.getCourse(id))
  } catch (e) {
    Logger.logError('getCourse', e)
    next(e)
  } finally {
    Logger.endLog('getCourse')
  }
}

module.exports = {
  getAllCourses,
  getCourse
}
