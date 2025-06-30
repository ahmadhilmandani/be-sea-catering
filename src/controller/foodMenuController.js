const connectDb = require('../config/db.js')
const { getFoodMenuRepo } = require('../repositories/foodMenuRepositories.js')

const getFoodMenuController = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const { getLimit, dietType } = req.query

    const res = await getFoodMenuRepo(getLimit, dietType)
    
    req.result = res
    
    next()
  } catch (error) {
    await connection.rollback()
    next(error)
  }
}




module.exports = { getFoodMenuController }