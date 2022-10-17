require('dotenv').config({ path: './config/config.env' })
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const connectToDB = require('./utils/dbConnect')

app.use(cors())
app.use(express.json())
// Parse application/json
app.use(bodyParser.json())
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
      extended: true
}))

connectToDB()

//Routes
const auth = require('./routes/auth')
app.use('/api', auth)

//Backend server 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
})