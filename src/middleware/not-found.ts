import { NextFunction, Request, Response } from "express"

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    status: 404,
    error: 'Not found'
  })
}

export default notFoundMiddleware
