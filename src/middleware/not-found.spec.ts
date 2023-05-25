import { NextFunction, Request, Response } from 'express'
import notFoundMiddleware from './not-found'
import { getMockReq, getMockRes } from '@jest-mock/express'

describe('notFoundMiddleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = getMockReq()
    res = getMockRes().res
    next = jest.fn()
  })

  it('should have status 404', () => {
    const sut = notFoundMiddleware

    sut(req, res, next)

    expect(res.status).toBeCalledWith(404)
  })

  it('should send error', () => {
    const sut = notFoundMiddleware
    const expected = {
      error: 'NO OK',
      status: 'Not Found'
    }
    sut(req, res, next)

    expect(res.send).toBeCalledWith(expected)
  })
})
