const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())

require('express-async-errors')

const config = require('./utils/config')
const logger = require('./utils/logger')

const blogitRouter = require('./controllers/blogit')
const userRouter = require('./controllers/user_control')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware.js')

logger.info('connecting to ', config.MONGODB_URI)
const mongoose = require('mongoose')
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')

    })
    .catch((erro) => {
        logger.error('error in connection to DB', error.message)
    })

app.use(middleware.requestLogger)

if(process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing.js')
    app.use('/api/testing', testingRouter)
}

app.use('/api/users', userRouter)
app.use(middleware.tokenExtractor)
app.use('/api/blogs/', blogitRouter)
app.use('/login', loginRouter)


app.use( middleware.errorHandler)
app.use( middleware.unknownEndpoint)

module.exports = app