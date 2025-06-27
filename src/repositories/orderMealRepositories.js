const connectDb = require("../config/db.js")

const getOrderMealRegistered = async (id_user, getLimit, isSend) => {
  const connection = await connectDb()

  try {
    let sql_statement_order_meal = `
      SELECT
        om.id_order_meal,
        om.id_user,
        om.name AS order_meal_name,
        om.id_delivery_type,
        om.id_food_menu,
        om.is_send,
        om.deliver_date_schedule,
        om.created_at,
        dt.day,
        dt.time_string,
        u.name AS user_name,
        u.address,
        u.phone_number,
        fm.name AS food_menu_name,
        fm.price,
        fm.description,
        fm.recomended_for
      FROM
        order_meal AS om
      INNER JOIN
        devlivery_type AS dt
      ON
        om.id_delivery_type = dt.id_delivery_type
      INNER JOIN
        users AS u
      ON
        om.id_user = u.id_user
      INNER JOIN
        food_menu AS fm
      ON
        om.id_food_menu = fm.id_food_menu
      WHERE
        om.id_user
    `
    let sqlParams = [id_user]
    if (isSend) {
      sql_statement_order_meal = sql_statement_order_meal + ' AND om.is_send = ?'
      sqlParams.push(isSend)
    }

    if (getLimit) {
      sql_statement_order_meal = sql_statement_order_meal + ' LIMIT = ?'
      sqlParams.push(getLimit)
    }


    const resOrderMeal = await connection.execute(sql_statement_order_meal, sqlParams)

    if (resOrderMeal[0].length > 0) {
      let sql_statement_nutritions = `
        SELECT
          n.id_nutrition,
          n.name,
          n.value,
          n.unit
        FROM
          nutritions AS n
        WHErE
          n.id_food_menu = ?
      `

      let res = [
        {
          'user': {
            'id': resOrderMeal[0][0].id_user,
            'name': resOrderMeal[0][0].user_name,
            'address': resOrderMeal[0][0].address,
            'phone_number': resOrderMeal[0][0].phone_number,
          },
          'order': []
        }
      ]

      for (let index = 0; index < resOrderMeal[0].length; index++) {
        res[0].order.push({
          'id_order_meal': resOrderMeal[0][index].id_order_meal,
          'id_food_menu': resOrderMeal[0][index].id_food_menu,
          'name': resOrderMeal[0][index].food_menu_name,
          'price': resOrderMeal[0][index].price,
          'description': resOrderMeal[0][index].description,
          'delivery': {
            'day': resOrderMeal[0][index].day,
            'time': resOrderMeal[0][index].time_string,
            'date_schedule': resOrderMeal[0][index].deliver_date_schedule,
          },
          'is_send': resOrderMeal[0][index].is_send,
          'nutritions': []
        })

        const resNutritions = await connection.execute(sql_statement_nutritions, [resOrderMeal[0][index].id_food_menu])

        for (let indexNutritions = 0; indexNutritions < resNutritions[0].length; indexNutritions++) {
          res[0].order[index].nutritions.push({
              id_nutrition: resNutritions[0][indexNutritions].id_nutrition,
              name: resNutritions[0][indexNutritions].name,
              value: resNutritions[0][indexNutritions].value,
              unit: resNutritions[0][indexNutritions].unit,
          })
        }
      }

      return res
    }

    return []

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
        om.name AS om_name,
        om.address AS om_address,
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

    const [res] = await connection.execute(sql_statement, sqlParams)
    if (res.length > 0) {
      let resp = [
        {
          'user': {
            'name': res[0].om_name,
            'address': res[0].om_address,
            'phone_number': res[0].om_phone_number,
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
    }

    return []


  } catch (error) {
    throw new Error(error)
  }
}

const postOrderMealUnregistered = async (name, address, phone_number, id_delivery_type, id_food_menu, deliver_date_schedule) => {
  const connection = await connectDb()

  try {
    const sql_statement = `
      INSERT INTO
        order_meal
        (
          name,
          address,
          phone_number,
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
          ?,
          ?,
          ?
        )
    `

    const sqlParams = [name, address, phone_number, id_delivery_type, id_food_menu, deliver_date_schedule, 0, new Date()]

    const res = await connection.execute(sql_statement, sqlParams)
    return res

  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { getOrderMealRegistered, postOrderMealRegistered, getOrderMealUnregistered, postOrderMealUnregistered }