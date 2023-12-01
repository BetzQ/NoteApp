const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const authRoutes = require('./app/routes/authRoutes')
const taskRoutes = require('./app/routes/taskRoutes')

const app = express()

dotenv.config()

app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
