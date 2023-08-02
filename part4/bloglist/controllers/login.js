const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')

loginRouter.post('/',async(req,res) => {
const {username,password} = req.body

const user = await User.findOne({username})
const passwordCheck = user === null?false :await bcrypt.compare(password,user.passwordHash)
if(!(user && passwordCheck)){
return res.status(401).json({error:'invalid username or password'})
}
const userForToken = {
    username: user.username,
    id: user._id,
}
const token = jwt.sign(userForToken,SECRET)
res.status(201).json({token,username:user.username,name:user.name})
})

module.exports = loginRouter