import EventEmitter from 'events'

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

const connect = (callback: (message: string) => void) => {
  logger.on(LOGGER_EVENTS.MESSAGE, callback)
}

export default {
  initLog,
  endLog,
  connect,
  logError
}
