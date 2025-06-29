const connectDb = require('../config/db.js')
const { getSubsDeliveryDayBySubId } = require('./subsDeliverDaysRepositories.js')

const getSubsDetailsByUserIdRepo = async (userId) => {
  const connection = await connectDb()

  try {
    let sql_statement_subs_detail = `
      SELECT
        s.id_diet_type,
        s.total_bill,
        s.status_subs,
        sd.id_subscription_detail,
        sd.id_subscription,
        sd.id_food_menu,
        sd.is_send,
        sd.id_meal_type,
        dt.name,
        dt.subs_diet_type_price_meal,
        mt.name AS meal_type_name,
        mt.estimate_time_int,
        s.created_at
      FROM
        subscriptions AS s
      INNER JOIN
        subscriptions_detail AS sd
      ON
        s.id_subscription = sd.id_subscription
      INNER JOIN
        diet_type AS dt
      ON
        s.id_diet_type = dt.id_diet_type
      INNER JOIN
        meal_type AS mt
      ON
        sd.id_meal_type = mt.id_meal_type
      WHERE
        s.id_user = ?
      ORDER BY
        created_at
      DESC
    `


    let sql_statement_food_menu = `
      SELECT
        fm.id_food_menu,
        fm.name AS food_menu_name,
        n.id_nutrition,
        n.name AS nutrition_name,
        n.value,
        n.unit
      FROM
        food_menu AS fm
      LEFT JOIN
        nutritions AS n
      ON
        fm.id_food_menu = n.id_food_menu
      WHERE
        fm.id_food_menu = ?
      `

    let sqlParams = [userId]

    const subsctiptionDetails = await connection.execute(sql_statement_subs_detail, sqlParams)


    if (sql_statement_subs_detail.length > 0) {
      const subDevDay = await getSubsDeliveryDayBySubId(subsctiptionDetails[0][0].id_subscription)

      let res = [
        {
          "subscription": {
            'id': subsctiptionDetails[0][0].id_subscription,
            'id_diet_type': subsctiptionDetails[0][0].id_diet_type,
            'name': subsctiptionDetails[0][0].name,
            'subs_diet_type_price_meal': subsctiptionDetails[0][0].subs_diet_type_price_meal,
            'status': subsctiptionDetails[0][0].status_subs,
            'delivery_day': subDevDay,
            'details': [],
            'total_bill': subsctiptionDetails[0][0].total_bill
          }
        }
      ]

      let foodMenu
      for (let index = 0; index < subsctiptionDetails[0].length; index++) {

        foodMenu = await connection.execute(sql_statement_food_menu, [subsctiptionDetails[0][index].id_food_menu])

        res[0].subscription.details.push({
          'id_subs_detail': subsctiptionDetails[0][index].id_subscription_detail,
          'is_send': subsctiptionDetails[0][index].is_send,
          'food': {
            'id_food': subsctiptionDetails[0][0].id_food_menu,
            'name': foodMenu[0][0].food_menu_name,
            'meal_type': {
              name: subsctiptionDetails[0][index].meal_type_name,
              estimate_time: subsctiptionDetails[0][index].estimate_time_int,
            },
            'nutritions': []
          }
        })


        for (let indexFoodMenu = 0; indexFoodMenu < foodMenu[0].length; indexFoodMenu++) {
          res[0].subscription.details[index].food.nutritions.push({
            'id_nutrition': foodMenu[0][indexFoodMenu].id_nutrition,
            'name': foodMenu[0][indexFoodMenu].nutrition_name,
            'val': foodMenu[0][indexFoodMenu].value,
            'unit': foodMenu[0][indexFoodMenu].unit,
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


const postSubsDetailsByUserIdRepo = async (id_subscription, id_food_menu, id_meal_type, is_send) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      INSERT INTO
        subscriptions_detail
        (
          id_subscription,
          id_food_menu,
          id_meal_type,
          is_send,
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

    let sqlParams = [id_subscription, id_food_menu, id_meal_type, is_send, new Date()]

    const res = await connection.execute(sql_statement, sqlParams)
    return res
  } catch (error) {
    throw new Error(error)
  }
}


const updateSubsDetailsRepositories = async (id_food_menu, id_delivery_type, is_send, id_subscription_detail) => {
  const connection = await connectDb()

  try {
    let sql_statement = `
      UPDATE
        subscriptions_detail
      SET
        id_food_menu = ?,
        id_delivery_type = ?,
        is_send = ?,
        updated_at = ?
      WHERE
        id_subscription_detail = ?
    `

    let sqlParams = [id_food_menu, id_delivery_type, is_send, new Date(), id_subscription_detail]

    const res = await connection.execute(sql_statement, sqlParams)
    return res
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = { getSubsDetailsByUserIdRepo, postSubsDetailsByUserIdRepo, updateSubsDetailsRepositories }