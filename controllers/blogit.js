const blogitRouter = require('express').Router()

const config = require('../utils/config')
const logger = require('../utils/logger')

const Blog = require('../model/blog.js')

blogitRouter.get('/', async (request, response) => {
    const lista = await Blog.find({})
    response.json(lista).end()
  })

blogitRouter.get('/:id', async (request, response) => {
    const ob = await Blog.findById(request.params.id)
    response.json(ob)
  })

blogitRouter.put('/update/:id', async (request, response, next) => {
    console.log("Arvoilla????", request.body)
    const ob = await Blog.findByIdAndUpdate(request.params.id,{likes: 100},{ new: true } )
    console.log("päivityksen jälkeen", ob)
    response.json(ob)
  })
  
blogitRouter.post('/', async (request, response, next) => {
  logger.info('Add start')
  try {
    const blogObject = new Blog(request.body)  
    const blogSaved = await blogObject.save()
    response.status(201).json(blogSaved)
  } catch (exeption) {
    response.status(400).end()
  }
})

blogitRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
  
module.exports = blogitRouter