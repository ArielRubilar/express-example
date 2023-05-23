
class CustomError extends Error {
  constructor (message, status) {
    super(message)
    this.status = status
    this.name = 'CustomError'
  }
}

class BusinessError extends Error {
  constructor (message, status) {
    super(message)
    this.status = status
    this.name = 'BusinessError'
  }
}

class ParamsError extends CustomError {
  constructor (message) {
    super(message, 400)
    this.name = 'ParamsError'
  }
}

module.exports = {
  CustomError,
  BusinessError,
  ParamsError
}
