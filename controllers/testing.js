
const config = require('../utils/config')
const logger = require('../utils/logger')

const Blog = require('../model/blog')
const User = require('../model/user')

const jwt = require('jsonwebtoken')

const router = require('express').Router()


router.post('/reset', async (request, response) => {
    console.log('reset start')
    await Blog.deleteMany({})
    console.log('reset start')
    await User.deleteMany({})
    console.log('reset end')
    response.status(200).end()
})
module.exports = router

