const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({message:"You are successfully logged in"})
})

router.get('/:id', (req, res) => {
    res.status(200).json({message:`logged in into user ${req.params.id}`})
})

module.exports = router