const notFoundMiddleware = require('./not-found')

describe('notFoundMiddleware', () => {
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

  it('should have status 404', () => {
    const sut = notFoundMiddleware

    sut(req, res, next)

    expect(res.status).toBeCalledWith(404)
  })

  it('should send error', () => {
    const sut = notFoundMiddleware
    const expected = {
      error: 'Not found',
      status: 404
    }
    sut(req, res, next)

    expect(res.send).toBeCalledWith(expected)
  })
})
