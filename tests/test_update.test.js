const config = require('../utils/config.js')
const { TestWatcher } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')


const api = supertest(app)
const helper = require('../tests/test_helper.js')
const Blog = require('../model/blog')


beforeEach(async() => {
      await Blog.deleteMany({})
      let newObject = new Blog(helper.oneBlog)
      await newObject.save()
  })

test('update likes', async () => {
    const res = await api.get('/api/blogs')
                        .set('Authorization',config.TEST_TOKEN)
    let obToUpdate = res.body[0]
    obToUpdate['likes'] = 500
    console.log(obToUpdate)
    const prom = await api.put(`/api/blogs/update/${obToUpdate.id}`)
                           .set('Authorization',config.TEST_TOKEN)
                           .send(obToUpdate)
    console.log("response", prom)
    expect(prom.body.likes).toEqual(500)
})


afterAll(() => {
    mongoose.connection.close()
})
