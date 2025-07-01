const connectDb = require('../config/db.js')

const getSubsByUserIdRepositories = async (userId) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      SELECT
        s.id_subscription,
        s.id_user,
        s.id_diet_type,
        s.status_subs,
        s.created_at,
        u.name AS name,
        u.phone_number,
        dt.name AS diet_type_name,
        dt.subs_diet_type_price_meal,
        dt.description
      FROM
        subscriptions AS s
      INNER JOIN
        users AS u
      ON
        s.id_user = u.id_user
      INNER JOIN
        diet_type AS dt
      ON
        s.id_diet_type = dt.id_diet_type
      WHERE
        s.id_user = ?
    `

    let sqlParams = [userId]

    const [res] = await connection.execute(sql_statement, sqlParams)
    return res
  } catch (error) {
    throw new Error(error)
  }
}


const postSubsRepositories = async (userId, id_diet_type, status_subs, total_bill) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      INSERT INTO
        subscriptions
        (
          id_user,
          id_diet_type,
          status_subs,
          total_bill,
          created_at
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?
        )
    `

    let sqlParams = [userId, id_diet_type, status_subs, total_bill, new Date()]

    const res = await connection.execute(sql_statement, sqlParams)
    return res
  } catch (error) {
    throw new Error(error)
  }
}


const updateSubsRepositories = async (id_subscription, id_diet_type, status_subs, is_reactivation) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      UPDATE
        subscriptions
      SET
        id_diet_type = ?,
        status_subs = ?,
        is_reactivation = ?,
        updated_at = ?
      WHERE
        id_subscription = ?
    `

    let sqlParams = [id_diet_type, status_subs, new Date(), id_subscription, is_reactivation]

    const res = await connection.execute(sql_statement, sqlParams)
    return res
  } catch (error) {
    throw new Error(error)
  }
}


const softDeleteSubsRepositories = async (id_subscription) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      UPDATE
        subscriptions
      SET
        is_delete = 1,
        updated_at = ?
      WHERE
        id_subscription = ?
    `

    let sqlParams = [new Date(), id_subscription]

    const res = await connection.execute(sql_statement, sqlParams)
    return res
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = { getSubsByUserIdRepositories, postSubsRepositories, updateSubsRepositories, softDeleteSubsRepositories }