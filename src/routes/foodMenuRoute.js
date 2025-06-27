const express = require('express')
const { getFoodMenuController } = require('../controller/foodMenuController')

const router = express.Router()


router.get('/', getFoodMenuController)

module.exports = router