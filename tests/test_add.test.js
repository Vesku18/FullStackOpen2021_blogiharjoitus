const { TestWatcher } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../model/blog.js')

const helper = require('./test_helper.js')


test('add and check they are more',  async () =>{

  const notesAtStart = await Blog.find({}) 
    await helper.addSeveralInDb()    
    const notesAtEnd = await Blog.find({})  
    expect(notesAtEnd).toHaveLength(notesAtStart.length+6)
  })

test('do not add blog without required values', async () =>{

    const newO = await api.post('/').send(helper.oneBlogWithoutTitleUrl) 
    console.log(newO.error)
    expect(400)
  })

  afterAll(() => {
    mongoose.connection.close()
})