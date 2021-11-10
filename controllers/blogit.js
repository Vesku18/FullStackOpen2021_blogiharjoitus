const blogitRouter = require('express').Router()

const config = require('../utils/config')
const logger = require('../utils/logger')

const Blog = require('../model/blog.js')
const User = require('../model/user.js')

blogitRouter.get('/', async (request, response) => {
    const lista = await Blog.find({}).populate('user')
    response.json(lista.map(u => u.toJSON())).end()
  })

blogitRouter.get('/:id', async (request, response) => {
    const ob = await Blog.findById(request.params.id)
    response.json(ob)
  })

blogitRouter.put('/update/:id', async (request, response, next) => {
    const ob = await Blog.findByIdAndUpdate(request.params.id,request.body,{ new: true } )
    console.log("päivityksen jälkeen", ob)
    response.json(ob)
  })
  
blogitRouter.post('/', async (request, response, next) => {
  logger.info('Add start')
  const body = request.body

  user = await User.findById(body.userId)
  body.user = user._id
  console.log("userille",body.user)

  try {
    const blogObject = new Blog(request.body)  
    const blogSaved = await blogObject.save()
    response.status(201).json(blogSaved)

    console.log("talletettu olio", blogSaved)

    user.blogs = user.blogs.concat(blogSaved._id)
    await user.save()

  } catch (exeption) {
    response.status(400).end()
  }
})

blogitRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
  
module.exports = blogitRouter