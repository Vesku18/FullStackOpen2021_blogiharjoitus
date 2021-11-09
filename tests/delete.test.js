const { TestWatcher } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const helper = require('../tests/test_helper.js')
const Blog = require('../model/blog.js')

beforeEach(async() => {
  await Blog.deleteMany({})
  let newObject = new Blog(helper.oneBlog)
  await newObject.save()
})

test('delete first in list',  async () =>{
    const notesAtStart = await Blog.find({}) 
    let blogToDelete = notesAtStart[0]
    const res = await api.delete(`/${blogToDelete.id}`)        
    const notesAtEnd = await Blog.find({})
    let pituus = notesAtStart.length-1 
    expect(notesAtEnd).toHaveLength(pituus)
  })

  afterAll(() => {
    mongoose.connection.close()
})