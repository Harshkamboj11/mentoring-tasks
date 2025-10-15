const express = require('express')
const signUp = require('../controller/signup')
const router = express.Router()

router.post('/signup', signUp)

module.exports = router 