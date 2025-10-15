const bcrypt = require('bcryptjs')
const User = require('../model/UserDB')

const verifyPass = async (req, res) => {

    const {username, password} = req.body


    if(!req.body){
        return res.status(422).json({Error:'Usernmae and password is must'})
    }
    
    if(!username || !password){
        return res.status(422).json({Error: 'Fill username and password'})
    }

    try {
        const user = await User.findOne({username: username})
        if(!user){
            return res.status(422).json({Error:'Invalid credientials'})
        }

        const solvedPass = await bcrypt.compare(password, user.password)

        console.log(solvedPass)

        if(solvedPass){
            return res.status(200).json({message: `Login successful`})
        }

        res.status(422).json({Error: `Invalid credientials`})
    } catch (error) {
        res.status(422).json({Error: `Something went wrong - ${error}`})
    }
}

module.exports = verifyPass