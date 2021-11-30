require('../utils/config.js')
const { TestWatcher } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')
const app = require('../app')
const api = supertest(app)
const User = require('../model/User')
const { blogWithoutLikes } = require('./test_helper')

const newUser = {
    name: 'Veikko Venäläinen"',
    username: 'Veksi',
    password: 'salasana'
} 
const newUser1 = {
    name: "Veikko Venäläinen1",
    username: "Veksi1",
    password: "salasana1"
} 

test('add user',  async () =>{
  const atStart = await User.find({}) 
  const responseObject = await api
  .post('/haloo')
  .send(newUser1) 
  console.log("RESPONSE", responseObject.body)
  const atEnd = await User.find({})  
  expect(atEnd).toHaveLength(atStart.length+1)
})


//test('do not add blog without required values', async () =>{
//    const newO = await api.post('/').send(helper.oneBlogWithoutTitleUrl) 
//    console.log(newO.error)
//    expect(400)
//  })

  afterAll(() => {
    mongoose.connection.close()
})