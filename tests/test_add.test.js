const { TestWatcher } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../model/blog.js')
const User = require('../model/user')
const helper = require('./test_helper.js')


test('add and check they are more',  async () =>{

  usersAll =  await User.find({}) 
  const useri = usersAll[0]
  helper.oneBlog.userId = useri.id

  console.log("Menossa:", helper.oneBlog)
  const notesAtStart = await Blog.find({}) 
  responseObject = await api.post('/').send(helper.oneBlog)    
  console.log("Talletettu:", responseObject.body)

  const notesAtEnd = await Blog.find({})  
  expect(notesAtEnd).toHaveLength(notesAtStart.length+1)
})

test('do not add blog without required values', async () =>{

    const newO = await api.post('/').send(helper.oneBlogWithoutTitleUrl) 
    console.log(newO.error)
    expect(400)
  })

  afterAll(() => {
    mongoose.connection.close()
})