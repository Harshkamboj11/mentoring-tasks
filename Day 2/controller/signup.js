const User = require('../model/UserDB')
const bcrypt = require('bcryptjs')

const signUp = async (req, res) => {
    const {username, password} = req.body

    if(!username || !password){
        return res.status(422).json({Error: 'All the fields are required'})
    }
    try {
        const hashedPass = await bcrypt.hash(password, 10) // password and saltrounds are given into the method hash
        const user = await User.create({
            username: username,
            password: hashedPass
        })

        res.status(200).json({message: 'User SignUp successful'})
    } catch (error) {
        res.status(422).json({Error: `Something went wrong - ${error}`})
    }
}

module.exports = signUp