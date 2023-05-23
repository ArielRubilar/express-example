const errorHandle = require('./error-handle')
const { CustomError } = require('./../errors/custom-error')

describe('errorHandle', () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = {}
    res = {
      send: jest.fn(() => res),
      status: jest.fn(() => res)
    }
    next = jest.fn()
  })

  describe('if error has status', () => {
    it('should have same status', () => {
      const sut = errorHandle
      const error = new CustomError('Custom Error', 303)
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
