const EventEmitter = require('events')

const logger = new EventEmitter()

const LOGGER_EVENTS = {
  MESSAGE: 'MESSAGE'
}

const initLog = (context = '', message = '') => {
  logger.emit(LOGGER_EVENTS.MESSAGE, `[INIT][${context}] - ${message} : ${new Date().getTime()}`)
}

const endLog = (context = '', message = '') => {
  logger.emit(LOGGER_EVENTS.MESSAGE, `[END][${context}] - ${message} : ${new Date().getTime()}`)
}

const logError = (context = '', message = '') => {
  logger.emit(LOGGER_EVENTS.MESSAGE, `[ERROR][${context}] - ${message} : ${new Date().getTime()}`)
}

const connect = (callback) => {
  logger.on(LOGGER_EVENTS.MESSAGE, callback)
}

module.exports = {
  initLog,
  endLog,
  connect,
  logError
}
