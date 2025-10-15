const express = require('express')

const router = express.Router()

const fs = require('fs').promises

router.get('/login', async (req, res) => {
    const query = req.query
    const username = query.username
    const password = query.password

    if(!username || !password){
        res.status(422).json({error:'Please provide the credientials to login'})
    }

    try {
        const rawData = await fs.readFile('credientials.json', 'utf-8')
        const data = JSON.parse(rawData)

        if(!data){
            res.status(422).json({error:'There is no credentials present into the database'})
        }

        if(username === data.userName && password === data.password){
            res.status(200).json({message:"Login successfull"})
        }

        res.status(422).json({error:'Invalid credentials'})

        console.log(data)
    } catch (error) {
        res.status(422).json({error: 'Unable to read data from the file'})
    }
})

module.exports = router