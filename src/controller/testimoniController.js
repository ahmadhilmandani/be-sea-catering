const connectDb = require("../config/db.js")
const { getTestimoniRepositories, postTestimoniRepositories } = require("../repositories/testimoniRepositories.js")

const getTestimoniController = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const getLimit = req.query?.getLimit || null

    const [res] = await getTestimoniRepositories(getLimit)
    req.result = res
    next()
  } catch (error) {
    next(error)
  }
}

const postTestimoniController = async (req, res, next) => {
  const connection = await connectDb()

  try {
    const {name, address, star, testimoni} = req.body

    const [res] = await postTestimoniRepositories(name, address, star, testimoni)
    req.result = res
    next()
  } catch (error) {
    await connection.rollback()
    next(error)
  }
}

module.exports = { getTestimoniController,postTestimoniController  }