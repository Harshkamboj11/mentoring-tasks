const mongoose = require('mongoose')
require('dotenv').config()

const User = new mongoose.Schema({
        username: {type:String, required:true},
        password: {type:String, required:true}
})


const user = mongoose.model('user', User)

module.exports = user