const connectDb = require("../config/db.js");
const { registerRepositories, loginRepositories } = require("../repositories/authRepositories");
const jwt = require('jsonwebtoken')


const registerController = async (req, res, next) => {
  const connection = await connectDb()
  try {
    const { name, email, password } = req.body

    const result = await registerRepositories(name, email, password)

    await connection.commit()

    return res.status(201).send({ 'data': { 'inserted_id': result.insertId } })

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
      username: getUser[0].username,
      name: getUser[0].name,
      email: getUser[0].email
    }

    const token = jwt.sign({ user: result }, "PASSWORD", { expiresIn: 86400 })

    if (getUser) {
      result['token'] = token
      return res.status(200).send({ 'data': result })
    }

  } catch (error) {
    await connection.rollback()
    next(error)
  }
}

module.exports = { registerController, loginController }