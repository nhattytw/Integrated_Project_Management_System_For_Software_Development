require('dotenv').config({ path: './config/config.env' })
const express = require('express')
const cors = require('cors')
const app = express()

// Parse application/json
app.use(express.json())

app.use(cors())

//Routes
const auth = require('./routes/auth')
const user = require('./routes/user')
const zoom = require('./routes/zoom')
const issue = require('./routes/issue')
const project = require('./routes/project')
const wbs = require('./routes/wbs')
const teams = require('./routes/teams')

const tasks = require('./routes/tasks')

app.use('/api', auth)
app.use('/api', user)
app.use('/api', zoom)
app.use('/api', wbs)
app.use('/api', issue)
app.use('/api', project)
app.use('/api', teams)
app.use('/api', tasks)

//Backend server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
