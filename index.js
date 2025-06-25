const express = require('express');
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(3000, () => {
  console.log(`running on http://localhost:3000`)
})