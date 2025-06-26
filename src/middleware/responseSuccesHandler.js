const responseSuccesHandler = (req, res, next) => {
  const statusCode = req.statusCode || 200
  const result = req.result

  return res.status(statusCode).send(
    {
      'is_error': false,
      'result': result
    }
  )
}

module.exports = { responseSuccesHandler }