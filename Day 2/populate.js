const mongoose = require('mongoose')
const express = require ('express')
require('dotenv').config()

const app = express()
const {User, Post} = require('./model/populateSchema')
app.use(express.json())

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('DB connected successfully')
    })
    .catch((e) => {
        console.log(`Unable to connect to DB - ${e}`)
    })


app.post('/user', async (req, res) => {
    const {name, email, password} = req.body

    if(!email || !password){
        return res.status(422).json({Error: 'All the fields are required'})
    }
    
    try {
        const exist = await User.findOne({email: email})

        if(exist){
            return res.status(201).json({Message: "User already existed"})
        }

        const user = await User.create({name, email, password}) 
        res.status(201).json({message: `User created successfully`, user})
    } catch (error) {
        console.error(error.message)
        res.status(422).json({Error: 'Something went wrong'})
    }
    
})


app.post('/post', async (req, res) => {
    const {title, description, authorId} = req.body

    if(!title || !description || !authorId){
        return res.status(422).json({message: "All the fields are mandatory"})
    }

    try {

        const authorExist = await User.findById(authorId)

        if(!authorExist){
            return res.status(422).json({Error: 'Author id does not exist'})
        }

        const post = await Post.create({title, description, author: authorId})
        const populatePost = await post.populate('author')
        res.status(201).json({Message: 'Post created successfully', populatePost})
    } catch (error) {
        res.status(422).json({Error: 'Something went wrong'})
    }
})


app.listen(process.env.PORT,() => {
    console.log(`server running at ${process.env.PORT}`)
})