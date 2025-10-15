const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../model/UserDB')
const verifyPass = require('../controller/verifyPass')

router.post('/login', verifyPass)

module.exports = router