

export interface IHttpError extends Error {
  httpStatus: number
  error: {
    status: string,
    message: string
  }
}

export class HttpError extends Error implements IHttpError {

  error: { status: string, message: string }
  httpStatus: number

  constructor(httpStatus: number, error: { status: string, message: string }) {
    super(error.message)
    this.httpStatus = httpStatus
    this.error = error
    this.name = 'HttpError'
  }
}



export class ParamsError extends HttpError implements IHttpError {
  constructor(message: string) {
    super(404, { status: 'NO OK', message })
    this.name = 'ParamsError'
  }
}


