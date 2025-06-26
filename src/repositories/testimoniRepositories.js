const connectDb = require("../config/db.js")

const getTestimoniRepositories = async (getLimit) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      SELECT
        name,
        address,
        testimoni,
        star,
        created_at
      FROM
        testimonies
    `
    let sqlParams = []
    if (getLimit) {
      sql_statement = sql_statement + 'LIMIT ?'
      sqlParams.push(getLimit)
    }


    const res = await connection.execute(sql_statement, sqlParams)

    return res

  } catch (error) {
    throw new Error(error)
  }
}

const postTestimoniRepositories = async (name, address, star, testimoni) => {
  const connection = await connectDb()

  try {
    const sql_statement = `
      INSERT INTO
        testimonies
        (
          name,
          address,
          star,
          testimoni  
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?
        )
    `
    const sqlParams = [name, address, star, testimoni]

    const res = await connection.execute(sql_statement, sqlParams)
    return res

  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { getTestimoniRepositories, postTestimoniRepositories }