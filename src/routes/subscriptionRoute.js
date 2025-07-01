const express = require('express')
const { getSubsByUserIdController, postSubsController, updateSubsController, softDeleteSubsController } = require('../controller/subscriptionController')

const router = express.Router()


router.get('/:userId', getSubsByUserIdController)
router.post('/', postSubsController)
router.put('/:idSubscription', updateSubsController)
router.delete('/:idSubscription', softDeleteSubsController)

module.exports = router