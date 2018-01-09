const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const users = require('./routes/users')
const challenges = require('./routes/challenges')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.set('json spaces', 40);

app.use('/users', users)
app.use('/challenges', challenges)

module.exports = app
