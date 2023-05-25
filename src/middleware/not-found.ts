import { NextFunction, Request, Response } from "express"

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    status: 'NO OK',
    error: 'Not found'
  })
}

export default notFoundMiddleware
