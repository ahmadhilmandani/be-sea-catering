const connectDb = require("../config/db.js")

const getAdminDashboardRepo = async (startDate, endDate) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      SELECT
        COUNT(*) AS new_subs,
        COUNT(is_reactivation) AS total_reactivation,
        SUM(total_bill) AS sum_total_bill
      FROM
        subscriptions
      WHERE
        is_delete = 0
      AND
        status_subs = 'active'
      AND
        created_at >= ? AND created_at <= ?
    `

    let sql_statement_total_sub = `
      SELECT
        COUNT(*) AS total_sub
      FROM
        subscriptions
      WHERE
        is_delete = 0
      AND
        status_subs = 'active'
    `

    const res = await connection.execute(sql_statement, [startDate, endDate])

    const res_total_sub = await connection.execute(sql_statement_total_sub)

    res[0][0].total_sub = res_total_sub[0][0].total_sub

    return res

  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { getAdminDashboardRepo }