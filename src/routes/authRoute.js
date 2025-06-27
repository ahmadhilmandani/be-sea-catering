const express = require('express')
const router = express.Router()

const { registerController, loginController, getUserInfo } = require('../controller/authController')
const { checkToken } = require('../middleware/authMiddleware')

router.post('/register', registerController)

router.post('/login', loginController)

router.get('/user-info', checkToken, getUserInfo)

module.exports = router