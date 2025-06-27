const express = require('express')
const { getSubsByUserIdController, postSubsController, updateSubsController } = require('../controller/subscriptionController')

const router = express.Router()


router.get('/:userId', getSubsByUserIdController)
router.post('/', postSubsController)
router.put('/:idSubscription', updateSubsController)

module.exports = router