const connectDb = require("../config/db")
const bcrypt = require('bcrypt')

const registerRepositories = async (name, email, password, address, alergies) => {
  const connection = await connectDb()
  const currentDatetime = new Date()

  try {
    const saltRounds = 10

    const sql_statement = `
      INSERT INTO
        users
        (
          name, 
          email, 
          password,
          address,
          alergies,
          is_admin,
          created_at
        )
      VALUES
        (
          ?, 
          ?, 
          ?,
          ?,
          ?,
          ?,
          ?
        )
    `

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    if (hashedPassword) {
      const [result] = await connection.execute(sql_statement, [name, email, hashedPassword, address, alergies, 0, currentDatetime])

      return result
    }

  } catch (error) {
    throw new Error(error)
  }
}


const   loginRepositories = async (email, password) => {
  const connection = await connectDb()

  try {
    const sql_statement = `
      SELECT
        *
      FROM
        users
      WHERE
        email = ?
      LIMIT 1
    `

    const [result] = await connection.execute(sql_statement, [email])

    if (result.length == 0) {
      return []
    }

    const match = await bcrypt.compare(password, result[0].password)
    if (match) {
      return result
    }

    return []

  } catch (error) {
    throw new Error(error)
  }

}


module.exports = { registerRepositories, loginRepositories }