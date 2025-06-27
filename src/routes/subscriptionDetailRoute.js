const express = require('express')
// const { getSubsByUserIdController, postSubsController, updateSubsController } = require('../controller/subscriptionController')
const { getSubsDetailByUserIdController, postSubsDetailController, updateSubsDetailsController } = require('../controller/subscriptionDetailController')

const router = express.Router()


router.get('/:userId', getSubsDetailByUserIdController)
router.post('/', postSubsDetailController)
router.put('/:idSubscriptionDetail', updateSubsDetailsController)

module.exports = router