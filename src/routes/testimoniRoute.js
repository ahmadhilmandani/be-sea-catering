const express = require('express')
const { getTestimoniController, postTestimoniController } = require('../controller/testimoniController')
const router = express.Router()

router.get('/', getTestimoniController)
router.post('/', postTestimoniController)

module.exports = router