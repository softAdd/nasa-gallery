const express = require('express')
const authRoutes = require('./routes/auth')
const imagesRoutes = require('./routes/images')
const passport = require('passport')
const app = express()

app.use(passport.initialize())
require('./middlewares/passport')(passport)

app.use(require('morgan')('dev'))
app.use(require('cors')())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/images', imagesRoutes)

module.exports = app