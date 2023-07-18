 const express = require('express')
 const app = express()
 const cors = require('cors')
 const mongoose = require('mongoose')
 require('express-async-errors');
 const blogsRouter = require('./controllers/blogs')
 const userRouter = require('./controllers/users')
 const loginRouter = require('./controllers/login')
 const middleware = require('./utils/middleware')
 const config = require('./utils/config')
 const logger = require('./utils/logger')

mongoose.set('strictQuery',false)
logger.info('...connecting to mongo',config.MONGO_BLOGS_URI)
mongoose.connect(config.MONGO_BLOGS_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login',loginRouter)
app.use('/api/blogs',middleware.tokenExtractor,middleware.userExtractor,blogsRouter)
app.use('/api/users',userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;