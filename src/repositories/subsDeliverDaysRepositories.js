const connectDb = require('../config/db.js')

const getSubsDeliveryDayBySubId = async (subId) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      SELECT
        dd.day
      FROM
        subs_delivery_days AS sdd
      INNER JOIN
        delivery_days AS dd
      ON
        sdd.id_delivery_day = dd.id_delivery_day 
      WHERE
        sdd.id_subscription = ?
    `

    let sqlParams = [subId]

    const [res] = await connection.execute(sql_statement, sqlParams)
    return res.map((val) => {
      return val.day
    })
  } catch (error) {
    throw new Error(error)
  }
}


const postSubsDeliverDayRepositori = async (id_subscription, id_delivery_day) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      INSERT INTO
        subs_delivery_days
        (
          id_subscription,
          id_delivery_day
        )
        VALUES
        (
          ?,
          ?
        )
    `

    let sqlParams = [id_subscription, id_delivery_day]


    const res = await connection.execute(sql_statement, sqlParams)
    return res

  } catch (error) {
    throw new Error(error)
  }
}


const updateSubsRepositories = async (id_subscription, id_diet_type, status_subs) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      UPDATE
        subscriptions
      SET
        id_diet_type = ?,
        status_subs = ?,
        updated_at = ?
      WHERE
        id_subscription = ?
    `

    let sqlParams = [id_diet_type, status_subs, new Date(), id_subscription]

    const res = await connection.execute(sql_statement, sqlParams)
    return res
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = { getSubsDeliveryDayBySubId, postSubsDeliverDayRepositori, updateSubsRepositories }