import { NextFunction, Request, Response } from "express"
import { ICustomError } from './../errors/custom-error'

const errorHandle = (error: ICustomError | Error, req: Request, res: Response, next: NextFunction) => {
  let status = 500
  if ('status' in error) {
    status = error.status
  }
  res.status(status).send({
    error: {
      status: status,
      message: error.message || 'Internal Server Error'
    }
  })
}

export default errorHandle
