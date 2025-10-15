//In this app, I will be using modular routes. 

const express = require('express')
//had to include this line to get the credientials from .env
require('dotenv').config()

const app = express()

const router = require('./Routes/user')

app.use('/user', router)
app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})