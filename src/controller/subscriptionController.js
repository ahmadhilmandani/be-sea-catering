const connectDb = require('../config/db.js')
const { getSubsByUserIdRepositories, postSubsRepositories, updateSubsRepositories } = require('../repositories/subscriptionRepositories.js')

const getSubsByUserIdController = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const { userId } = req.params

    const [res] = await getSubsByUserIdRepositories(userId)
    req.result = res
    next()
  } catch (error) {
    await connection.rollback()
    next(error)
  }
}



const postSubsController = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const { id_user, id_diet_type, status_subs } = req.body

    const [res] = await postSubsRepositories(id_user, id_diet_type, status_subs)
    req.result = res
    next()
  } catch (error) {
    await connection.rollback()
    next(error)
  }
}



const updateSubsController = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const { idSubscription } = req.params
    const { id_diet_type, status_subs } = req.body

    const [res] = await updateSubsRepositories(idSubscription, id_diet_type, status_subs)
    req.result = res
    next()
  } catch (error) {
    await connection.rollback()
    next(error)
  }
}


module.exports = { getSubsByUserIdController, postSubsController, updateSubsController }