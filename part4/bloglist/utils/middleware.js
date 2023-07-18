const logger = require('./logger')
const jwt = require('jsonwebtoken')
const {SECRET} =require('./config')
const requestLogger = (req,res,next)=>{
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('---')
    next()
}
const tokenExtractor= (req,res,next)=>{
  const authorization = req.headers.authorization
  if(!authorization){
    return res.status(401).json({error:'No Auhtorization token added'})
  }
  const token = authorization.split(' ')[1]
    req.token = token
    next()
}
const userExtractor= (req,res,next)=>{
  const userDetails =jwt.verify(req.token,SECRET)
    req.user = userDetails
    next()
}
const errorHandler = (error, req, res, next) => {

    logger.error(error.name) 
    logger.error(error.message) 
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
  }
const unknownEndpoint = (req,res)=>{
res.status(404).json({error:"Unknown Endpoint"})
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
  }