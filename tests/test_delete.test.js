const config = require('../utils/config')
const { TestWatcher } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper.js')
const Blog = require('../model/blog')

beforeEach( async () => {
  await Blog.deleteMany({})
  responseObject = await api.post('/api/blogs')
                            .set('Authorization',config.TEST_TOKEN)
                            .send(helper.oneBlog)    
})

test('delete first in list',  async () =>{

  const notesAtStart = await Blog.find({}) 
  let blogToDelete = await notesAtStart[0].toJSON()

  const res = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization',config.TEST_TOKEN)
     
  const notesAtEnd = await Blog.find({})
  let pituus = notesAtStart.length-1 
  expect(notesAtEnd).toHaveLength(pituus)
  })

  afterAll(() => {
    mongoose.connection.close()
})