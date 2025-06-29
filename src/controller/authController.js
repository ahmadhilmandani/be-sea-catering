const connectDb = require("../config/db.js");
const { registerRepositories, loginRepositories } = require("../repositories/authRepositories");
const jwt = require('jsonwebtoken')


const registerController = async (req, res, next) => {
  const connection = await connectDb()
  try {
    const { name, email, password, address, alergies } = req.body

    const result = await registerRepositories(name, email, password, address, alergies)

    await connection.commit()

    req.statusCode = 201
    req.result = result.insertId
    next()
    
  } catch (error) {
    await connection.rollback()
    next(error)
  }
}


const loginController = async (req, res, next) => {
  const connection = await connectDb();

  try {
    const { email, password } = req.body

    const getUser = await loginRepositories(email, password)

    if (getUser.length == 0) {
      return res.status(404).send({
        'is_error': true,
        'msg': 'Email atau Password Salah'
      })
    }

    const result = {
      user_id: getUser[0].id_user,
      name: getUser[0].name,
      email: getUser[0].email,
      address: getUser[0].address,
      alergy: getUser[0].alergies,
    }

    const token = jwt.sign({ user: result }, "PASSWORD", { expiresIn: 86400 })

    if (getUser) {
      result['token'] = token
      req.result = result
      next()
    }

  } catch (error) {
    await connection.rollback()
    next(error)
  }
}

const getUserInfo = async (req, res, next) => {
  const connection = await connectDb();

  try {
    const token = req.headers['authorization']

    const decodeToken = jwt.verify(token.replace('Bearer ', ''), "PASSWORD")

    if (token) {
      req.result = decodeToken
      next()
    }

  } catch (error) {
    await connection.rollback()
    next(error)
  }
}

module.exports = { registerController, loginController, getUserInfo }