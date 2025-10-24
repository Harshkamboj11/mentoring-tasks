const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    post:[]
})

const User = mongoose.model('User', userSchema)

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = {Post,User}