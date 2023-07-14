const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const url = process.env.MONGO_URI
console.log('this is url',url)

mongoose.connect(url,(err) => {
  if(err){
    console.log('connection error')
  } else console.log('Connection succesful')
})

const phoneBookSchema = new mongoose.Schema({
  name:{ type:String,minLength:3,required:true },
  number:{ type:String,required:true, validate: {
    validator: function(v) {
      return /\d{2,3}-\d{7,8}/.test(v)
    },
    message: 'not valid number format is xx/xxx - xxxxxxx/x'
  }, }
})

phoneBookSchema.set('toJSON',{
  transform:(doc,retDOc) => {
    retDOc.id = retDOc._id
    delete retDOc._id
    delete retDOc.__v
  }
})

module.exports = mongoose.model('phonebook',phoneBookSchema)