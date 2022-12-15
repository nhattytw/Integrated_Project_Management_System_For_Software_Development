require('dotenv').config({ path: './config/config.env' })
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()

// Parse application/json
app.use(bodyParser.json())
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
      extended: true
}))
app.use(cors())

//Routes
const auth = require('./routes/auth')
const user = require('./routes/user')
const item = require('./routes/item')

app.use('/api', auth)
app.use('/api', user)
app.use('/api',item)
//Backend server 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
})
