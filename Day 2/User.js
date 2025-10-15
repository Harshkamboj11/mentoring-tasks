const express = require('express')
const mongoose = require('mongoose')
const signup = require('./routes/signUp')
const login = require('./routes/login')

require('dotenv').config()
const app = express()

app.use(express.json())

app.use('/', signup)
app.use('/', login)
console.log(process.env.DB_URL)

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log(`DB connected successfully`)
    })
    .catch(() => {
        console.log(`Error connecting to DB`)
    })


app.listen(process.env.PORT, () => {
    console.log(`Server running`)
})