const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')

const config = require('./utils/config')
const logger = require('./utils/logger')

const blogitRouter = require('./controllers/blogit')

logger.info('connecting to ', config.MONGODB_URI)
const mongoose = require('mongoose')
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')

    })
    .catch((erro) => {
        logger.error('error in connection to DB', error.message)
    })


app.use('/', blogitRouter)
app.use(cors())
app.use(express.json())

module.exports = app