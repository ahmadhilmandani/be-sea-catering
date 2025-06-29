const connectDb = require('../config/db.js')
const { getSubsDetailsByUserIdRepo, postSubsDetailsByUserIdRepo, updateSubsDetailsRepositories } = require('../repositories/subscriptionDetailRepositories.js')
const { postSubsRepositories } = require('../repositories/subscriptionRepositories.js')
const { postSubsDeliverDayRepositori } = require('../repositories/subsDeliverDaysRepositories.js')

const getSubsDetailByUserIdController = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const { userId } = req.params

    const [res] = await getSubsDetailsByUserIdRepo(userId)
    req.result = res
    next()
  } catch (error) {
    await connection.rollback()
    next(error)
  }
}


const postSubsDetailController = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const { id_user, id_diet_type, status_subs, food, delivery_days, total_bill } = req.body

    const [resSubs] = await postSubsRepositories(id_user, id_diet_type, status_subs, total_bill)

    let resp

    for (let index = 0; index < delivery_days.length; index++) {
      await postSubsDeliverDayRepositori(resSubs.insertId, delivery_days[index].id_delivery_day)
    }

    for (let index = 0; index < food.length; index++) {
      resp = await postSubsDetailsByUserIdRepo(resSubs.insertId, food[index].id_food_menu, food[index].id_meal_type, 0)
    }

    await connection.commit()
    req.result = resp
    next()
  } catch (error) {
    await connection.rollback()
    next(error)
  }
}



const updateSubsDetailsController = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const { idSubscriptionDetail } = req.params
    const { id_food_menu, id_delivery_type, is_send } = req.body

    const [res] = await updateSubsDetailsRepositories(id_food_menu, id_delivery_type, is_send, idSubscriptionDetail)
    req.result = res
    next()
  } catch (error) {
    await connection.rollback()
    next(error)
  }
}


module.exports = { getSubsDetailByUserIdController, postSubsDetailController, updateSubsDetailsController }