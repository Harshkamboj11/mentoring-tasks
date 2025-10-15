const express = require('express')

const app = express()

const fs = require('fs').promises

const router = express.Router();

router.get('/signup',async (req, res) => {
    const query = req.query
    const userName = query.username
    const password = query.password

    // if(!userName || !password){
    //     res.status(422).json({err:'Please check the credientials you have provided'})
    // }

    try {
        if(userName && password){
            await fs.writeFile('credientials.json',JSON.stringify({userName, password}))
            res.status(200).json({message:"Credentials saved successfully"})
        }
        if(!userName || !password){
            res.status(422).json({error:'Please provide credientials to signup'})
        }
        
    } catch (error) {
        res.status(422).json({error:'Error in writing credentials to the database'})
    }
})

module.exports = router