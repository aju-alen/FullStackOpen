const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true,minLength:3},
    name:{type:String,required:true},
    passwordHash:{type:String,required:true,minLength:3},
    blogList:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'}
    ]
})

userSchema.set('toJSON',{transform:(doc,retDoc) => {
    retDoc.id = retDoc._id.toString()
    delete retDoc.passwordHash
    delete retDoc.__v
    delete retDoc._id
}})
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User',userSchema)