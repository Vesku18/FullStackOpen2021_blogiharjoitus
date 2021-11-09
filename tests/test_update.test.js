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

test('update likes', async () => {
    const res = await api.get('/')
    let obToUpdate = res.body[0]
    obToUpdate['likes'] = 500
    const prom = await api.put(`/update/${obToUpdate.id}`)
                          .send(obToUpdate)
    expect(prom.body.likes).toEqual(500)
})


afterAll(() => {
    mongoose.connection.close()
})
