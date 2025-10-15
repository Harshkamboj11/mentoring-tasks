const express = require('express')

require('dotenv').config()

const app = express()

const signup = require('./Routes/signup')
const login = require('./Routes/login')

app.use('/', signup)
app.use('/',login)

app.listen(process.env.PORT || 3000, () => {
    console.log(`http://localhost:${process.env.PORT || 3000}`)
})