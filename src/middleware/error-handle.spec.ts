import errorHandle from './error-handle'
import { HttpError } from '../errors/http.error'
import { NextFunction, Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'

describe('errorHandle', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = getMockReq()
    res = getMockRes().res
    next = jest.fn()
  })

  describe('if error has status', () => {
    it('should have same status', () => {
      const sut = errorHandle
      const error = new HttpError(303, { status: 'NO OK', message: '' })
      sut(error, req, res, next)

      expect(res.status).toHaveBeenCalledWith(303)
    })
  })

  describe('if error has no status', () => {
    it('should have 500', () => {
      const sut = errorHandle
      const error = new Error()
      sut(error, req, res, next)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })
})
