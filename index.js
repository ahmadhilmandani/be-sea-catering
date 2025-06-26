const express = require('express');

const app = express()

require('dotenv').config()

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRoute = require('./src/routes/authRoute.js')
const { log } = require('./src/middleware/log')
const { errorHanlder } = require('./src/middleware/errorHanlder')



app.use(log)
app.use('/api/auth', authRoute)
app.use(errorHanlder)


app.listen(3000, () => {
  console.log(`running on http://localhost:3000`)
})