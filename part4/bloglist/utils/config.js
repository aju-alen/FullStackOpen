require('dotenv').config('../.env')

const MONGO_BLOGS_URI = process.env.NODE_ENV === 'test'
?process.env.TEST_MONGO_BLOGS_URI 
:process.env.MONGO_BLOGS_URI
const PORT = process.env.PORT;

module.exports = {MONGO_BLOGS_URI,PORT}