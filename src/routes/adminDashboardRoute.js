const express = require('express')
const { getAdminDashboardController } = require('../controller/adminDashboardController')
const router = express.Router()

router.get('/', getAdminDashboardController)

module.exports = router