import { NextFunction, Request, Response } from "express"
import { IHttpError } from '../errors/http.error'

const errorHandle = (internalError: IHttpError | Error, req: Request, res: Response, next: NextFunction) => {
  let httpStatus = 500
  if ('httpStatus' in internalError) {
    httpStatus = internalError.httpStatus
  }
  let error = { status: 'NO OK', error: 'Internal Server Error' }
  if ('error' in internalError) {
    error.status = internalError.error.status
    error.error = internalError.error.message
  }
  res.status(httpStatus).send(error)
}

export default errorHandle
