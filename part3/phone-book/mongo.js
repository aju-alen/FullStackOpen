const mongoose = require('mongoose')
const password = process.argv[2]
const url =  `mongodb+srv://fullstack:${password}@cluster0.snwyfmi.mongodb.net/directory?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)
const phoneBookSchema = new mongoose.Schema({
  name:String,
  number:Number
})
console.log(process.argv)
const phoneBook  = mongoose.model('phoneBook',phoneBookSchema)

const newData = new phoneBook({
  name: process.argv[3],
  number: process.argv[4]
})

const result = async() => {
  const { name,number }=newData
  // const duplicate = phoneBook.find({name:process.argv[3]})
  // console.log('dupliiiiiiiiiiiiacacacac',duplicate);

  await newData.save()
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
}
result()