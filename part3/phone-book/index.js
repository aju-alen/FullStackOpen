const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const Phonebook = require('./models/phoneBook')
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('dist'))
const wrongRoute = (req, res) => {
  res.status(400).send('Unknown Endpoint')
}
const errorHandler = (err, req, res, next) => {
  console.log('---', err.message)
  console.log('---', err.name)
  if (err.name === 'CastError') {
    return res.status(400).send({ err: err.message })
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({ err: err.message })
  }
  next(err)
}

app.get('/api/persons', async (req, res) => {
  const result = await Phonebook.find({})
  res.json(result)
})
app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const result = await Phonebook.findOne({ id: req.params.id })
    if (result) {
      res.json(result)
    } else {
      res.status(400).end()
    }
  } catch (err) {
    next(err)
  }

})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const deleteData = await Phonebook.findByIdAndRemove(req.params.id)
    if (deleteData) {
      res.json(deleteData)
    } else {
      res.status(400).end()
    }
  } catch (err) {
    next(err)
  }
})

app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body
  console.log(name, number)
  const newPhoneBook = new Phonebook({
    name,
    number
  })
  try {
    const newData = await newPhoneBook.save()
    res.json(newData)
  } catch (err) {
    next(err)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const { name, number } = req.body
    const foundPerson = await Phonebook.findOne({ name })
    if (foundPerson) {
      const result = await Phonebook.findByIdAndUpdate(req.params.id, { name, number }, { new: true,runValidators:true,context:'query' })
      res.json(result)
    } else {
      res.status(400).end()
    }
  } catch (err) {
    next(err)
  }
})

app.get('/info', async (req, res, next) => {
  try{
    let time = Date()
    let list = await Phonebook.find({})
    res.send(`<h1>Phonebook has info for ${list.length} people</h1>
  <br/>
  <p>${time}</p>
  `)
  }catch(e){
    next(e)
  }

})
app.use(wrongRoute)
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})