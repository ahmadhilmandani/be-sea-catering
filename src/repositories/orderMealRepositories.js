const connectDb = require("../config/db.js")

const getOrderMealRegistered = async (id_user, getLimit, isSend) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      SELECT
        om.id_order_meal AS om_id_order_meal,
        om.id_user AS om_id_user,
        u.name AS u_name,
        u.address AS u_address,
        u.phone_number AS u_phone_number,
        om.id_delivery_type AS om_id_delivery_type,
        devt.day AS devt_day,
        devt.time_string AS devt_time_string,
        om.id_food_menu AS om_id_food_menu,
        om.is_send AS om_is_send,
        om.deliver_date_schedule AS om_deliver_date_schedule,
        fm.name AS fm_name,
        fm.price AS fm_price,
        fm.description AS fm_description,
        dt.name AS dt_name
      FROM
        order_meal AS om
      INNER JOIN
        users AS u
      ON
        om.id_user = u.id_user
      INNER JOIN
        devlivery_type AS devt
      ON
        om.id_delivery_type = devt.id_delivery_type
      INNER JOIN
        food_menu AS fm
      ON
        om.id_food_menu = fm.id_food_menu
      INNER JOIN
        diet_type AS dt
      ON
        fm.id_diet_type = dt.id_diet_type
      WHERE
        om.id_user = ?
    `
    let sqlParams = [id_user]
    if (isSend) {
      sql_statement = sql_statement + ' AND om.is_send = ?'
      sqlParams.push(isSend)
    }

    if (getLimit) {
      sql_statement = sql_statement + ' LIMIT = ?'
      sqlParams.push(getLimit)
    }


    const [res] = await connection.execute(sql_statement, sqlParams)

    let resp = [
      {
        'user': {
          'id': res[0].om_id_user,
          'name': res[0].u_name,
          'address': res[0].u_address,
          'phone_number': res[0].u_phone_number,
        },
        'order_meals': []
      }
    ]
    for (let index = 0; index < res.length; index++) {
      resp[0].order_meals.push({
        'id_order_meal': res[index].om_id_order_meal,
        'id_food_menu': res[index].om_id_food_menu,
        'name': res[index].fm_name,
        'price': res[index].fm_price,
        'description': res[index].fm_fm_description,
        'delivery': {
          'day': res[index].devt_day,
          'time': res[index].devt_time_string
        },
        'is_send': res[index].om_is_send,
        'diet_type': res[index].dt_name,
        'deliver_date_schedule': res[index].om_deliver_date_schedule,
      })
    }

    return resp

  } catch (error) {
    throw new Error(error)
  }
}

const postOrderMealRegistered = async (id_user, id_delivery_type, id_food_menu, deliver_date_schedule, is_send) => {
  const connection = await connectDb()

  try {
    const sql_statement = `
      INSERT INTO
        order_meal
        (
          id_user,
          id_delivery_type,
          id_food_menu,
          deliver_date_schedule,
          is_send,
          created_at
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
    `

    const sqlParams = [id_user, id_delivery_type, id_food_menu, deliver_date_schedule, is_send, new Date()]

    const res = await connection.execute(sql_statement, sqlParams)
    return res

  } catch (error) {
    throw new Error(error)
  }
}

const getOrderMealUnregistered = async (phone_number, getLimit, isSend) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      SELECT
        om.id_order_meal AS om_id_order_meal,
        om.id_user AS om_id_user,
        om.name AS om_name,
        om.address AS om_adress,
        om.phone_number AS om_phone_number,
        om.id_delivery_type AS om_id_delivery_type,
        devt.day AS devt_day,
        devt.time_string AS devt_time_string,
        om.id_food_menu AS om_id_food_menu,
        om.is_send AS om_is_send,
        fm.name AS fm_name,
        fm.price AS fm_price,
        fm.description AS fm_description,
        dt.name AS dt_name
      FROM
        order_meal AS om
      INNER JOIN
        devlivery_type AS devt
      ON
        om.id_delivery_type = devt.id_delivery_type
      INNER JOIN
        food_menu AS fm
      ON
        om.id_food_menu = fm.id_food_menu
      INNER JOIN
        diet_type AS dt
      ON
        fm.id_diet_type = dt.id_diet_type
      WHERE
        om.phone_number = ?
    `
    let sqlParams = [phone_number]
    if (isSend) {
      sql_statement = sql_statement + ' AND om.is_send = ?'
      sqlParams.push(isSend)
    }

    if (getLimit) {
      sql_statement = sql_statement + ' LIMIT = ?'
      sqlParams.push(getLimit)
    }


    const res = await connection.execute(sql_statement, sqlParams)

    return res

  } catch (error) {
    throw new Error(error)
  }
}

const postOrderMealUnregistered = async (name, address, phone_number, id_delivery_type, id_food_menu, is_send) => {
  const connection = await connectDb()

  try {
    const sql_statement = `
      INSERT INTO
        testimonies
        (
          name,
          address,
          phone_number,
          id_delivery_type,
          id_food_menu,
          is_send
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
    `

    const sqlParams = [name, address, phone_number, id_delivery_type, id_food_menu, is_send]

    const res = await connection.execute(sql_statement, sqlParams)
    return res

  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { getOrderMealRegistered, postOrderMealRegistered, getOrderMealUnregistered, postOrderMealUnregistered }