const express = require('express')

const mongoose = require('mongoose')

const app = express()

require('dotenv').config()

app.use(express.json())

const User = require('./model/signup')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('DB connected successfully')
    })
    .catch(() => {
        console.log('Db connection unsuccessful')
    })

app.post('/signup', async (req, res) => {
    const {username,email, password} = req.body

    const payload = {
        email, password
    }

    const token = jwt.sign(payload, process.env.JWT_SECERET, {algorithm: 'HS256', expiresIn:'1h'})

    res.setHeader('authorization', `Bearer ${token}`)
    console.log(token)
    if(!username || !password || !email){
        return res.status(422).json({Error: 'All the fields are required'})
    }

    try {
        const hashedPass = await bcrypt.hash(password, 10)

        const existingUser = await User.findOne({username: username})

        if(existingUser){
            return res.status(422).json({Error: 'This User is already signed up'})
        }

        const user = await User.create({username,email, password: hashedPass})
        console.log('User added')
        res.status(201).json({message: 'User created successfully', user})
    } catch (error) {
        res.status(422).json({Error: 'Unable to create the user', details: error.message})
    }
})

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(422).json({Error: 'No auth token generated please signup'})
    }

    const token = authHeader.split(' ')[1]
    console.log(token)

    jwt.verify(token, process.env.JWT_SECERET, (err, decoded) => {
        if(err){
            return res.status(422).json({Error: 'Wrong credientials'})
        }

        req.user = decoded
        next();
    })
}

app.post('/login', verifyToken, async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(422).json({Error: 'User not found'})
        }

        const matchPass = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(422).json({Error: 'Wrong credientials, please check again before login'})
        }
        res.status(200).json({message: 'Logged in successful'})
    } catch (error) {
        res.status(422).json({Error: 'Something went wrong'})
    }
    
})


app.listen(process.env.PORT, () => [
    console.log(`Running at PORT ${process.env.PORT}`)
])