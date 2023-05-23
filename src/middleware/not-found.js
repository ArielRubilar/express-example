
const notFoundMiddleware = (req, res, next) => {
  res.status(404).send({
    status: 404,
    error: 'Not found'
  })
}

module.exports = notFoundMiddleware
