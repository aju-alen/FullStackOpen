const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body
    if (!password || password.length<=3){
       return  res.status(404).json({error:'User has not entered password or password is less than 3 characters'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })
   
        const savedUser = await user.save()
        if (savedUser) {
            res.status(201).json(savedUser)
        } else {
            res.status(404).json({ error: "user was not saved in db" })
        }
})

userRouter.get('/',async (req,res) => {
    const allUsers = await User.find({}).populate('blogList',{user:0,likes:0})
    if (allUsers) {
        res.status(201).json(allUsers)
    } else {
        res.status(404).json({ error: "user was not saved in db" })
    }
})

module.exports = userRouter