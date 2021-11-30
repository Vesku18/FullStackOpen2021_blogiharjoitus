// ERROR HANDLING
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Väärä formaatti' })
  }
  else if (error.name === 'ReferenceError') {
    return response.status(500).send({ error: 'Oikea formaatti mutta väärä osoitus' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })  }

  next(error)
}

const requestLogger =(req,res,next) => {
  console.log(req.method + ':' + JSON.stringify(req.body) )
  next()
}

const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../model/user')

const getTokenFrom = (request) => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
    return authorization.substring(7)  
  }  
  console.log('Ei ollu tokenia niin nulli palautetan')
  return null
}

const tokenExtractor = async ( request,response,next) => {
  // Tokenin tsekkaus ja sen perusteella hlö
    const token = getTokenFrom(request)  
    console.log("Token Extractor", token)

    if(token){
      const decodedToken = jwt.verify(token, process.env.SECRET)  
      console.log("decoded", decodedToken)
      if (!token || !decodedToken.id) {    
        logger.error('Error: Token missing or invalid')  
        console.log('Error: Token missing or invalid')
        return response.status(401).json({error: 'token missing or invalid'})  
        }  
      const user = await User.findById(decodedToken.id)

      request.token = token
      request.userId = decodedToken.id
      console.log("userId", request.userId)
      request.userObject = user._id    

      
    }else{
      request.token=null
      console.log("Ei tokenia")
      
    }

    next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenExtractor
}