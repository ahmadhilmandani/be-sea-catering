const dayjs = require("dayjs")
const connectDb = require("../config/db.js")
const { getAdminDashboardRepo } = require("../repositories/adminDashboardRepositories.js")

const getAdminDashboardController = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const startDate = dayjs(req.query?.startDate).endOf('day').format('YYYY-MM-DD HH:mm:ss') 
    const endDate = dayjs(req.query?.endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss')

    console.log(startDate)
    console.log(endDate)

    const [res] = await getAdminDashboardRepo(startDate, endDate)
    req.result = res
    next()
  } catch (error) {
    next(error)
  }
}


module.exports = { getAdminDashboardController }