const express = require('express')
const { getOrderMealRegisteredC, postOrderMealRegisteredC, getOrderMealUnregisteredC, postOrderMealUnregisteredC } = require('../controller/orderMealController')

const router = express.Router()


router.get('/registered', getOrderMealRegisteredC)
router.post('/registered', postOrderMealRegisteredC)
router.get('/unregistered', getOrderMealUnregisteredC)
router.post('/unregistered', postOrderMealUnregisteredC)

module.exports = router