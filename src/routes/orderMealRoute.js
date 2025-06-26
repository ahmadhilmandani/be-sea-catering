const express = require('express')
const { getOrderMealRegisteredC, postOrderMealRegisteredC } = require('../controller/orderMealController')

const router = express.Router()


router.get('/registered', getOrderMealRegisteredC)
router.post('/registered', postOrderMealRegisteredC)
// router.get('/unregistered', getOrderMealUnregistered)
// router.post('/unregistered', postOrderMealUnregistered)

module.exports = router