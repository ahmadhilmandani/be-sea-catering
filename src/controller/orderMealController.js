const connectDb = require("../config/db.js")
const { getOrderMealRegistered, postOrderMealRegistered } = require("../repositories/orderMealRepositories.js")



// getOrderMealRegistered
// postOrderMealRegistered
// getOrderMealUnregistered
// postOrderMealUnregistered

const getOrderMealRegisteredC = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const id_user = req.query?.id_user || null
    const getLimit = req.query?.getLimit || null
    const isSend = req.query?.isSend || null

    const res = await getOrderMealRegistered(id_user, getLimit, isSend)
    req.result = res
    next()
  } catch (error) {
    next(error)
  }
}

const postOrderMealRegisteredC = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const { id_user, id_delivery_type, id_food_menu, deliver_date_schedule, is_send } = req.body

    const [res] = await postOrderMealRegistered(id_user, id_delivery_type, id_food_menu, deliver_date_schedule, is_send)
    req.result = res
    next()
  } catch (error) {
    await connection.rollback()
    next(error)
  }
}

module.exports = { getOrderMealRegisteredC, postOrderMealRegisteredC }