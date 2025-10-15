const express = require('express')

require('dotenv').config()

const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

const key = process.env.JWT_SECERET

app.post('/generate', (req, res) => {
    const {username, password} = req.body

    if(!username || !password){
        return res.status(422).json({Error: 'All field are must'})
    }

    //Payload - The data that i want to make seceret or in the token
    const payload = {
        user: username,
        pass: password
    }

    //creates token with seceret and privacy
    const token = jwt.sign(payload, key, {expiresIn: '60s'})
})


function verifyToken(req, res, next){
    const authHeader = req.headers['authorization']

    if(!authHeader){
        return res.status(422).json({Error: 'Key is not generated'})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, key, (err, decoded) => {
        
        if(err){
            return res.status(422).json('Something went wrong')
        }

        req.user = decoded
        next()
    })
}

app.get('/protected', verifyToken, (req, res) => {
    res.json({
        message: 'Access granted to protect data',
        user:req.user
    })
})

app.get('decode', (req, res) => {
    const {token} = req.body

    if(!token){
        return res.status(422).json({Error: 'Token not found'})
    }

    const decoded = jwt.decode(token, {complete: true})
    res.json(decoded)
})

app.listen(process.env.PORT, () => {
    console.log(`http:localhost:${process.env.PORT}`)
})