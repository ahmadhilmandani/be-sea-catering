const jwt = require('jsonwebtoken');
const connectDb = require('../config/db');



const checkToken = async (req, res, next) => {
  const connection = await connectDb();

  try {
    const token = req.headers['authorization']
    if (!token) {
      return res.status(401).send({
        'is_error': true,
        'msg': "Silahkan Login Terlebih Dahulu!",
      })
    }

    const decodeToken = jwt.verify(token.replace('Bearer ', ''), "PASSWORD")

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { checkToken }