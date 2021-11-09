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

test('blogs overeall', async () => {
    const prom = await api.get('/')
    console.log(prom.header)
    expect(prom.status).toEqual(200)
    expect(prom.header['content-type']).toContain('application/json')
})

test('id exists', async () => {
    const response = await api.get('/')
    expect(response.body[0].id).toBeDefined()
})

test('likes has default value', async () => {
    let newObject = new Blog(helper.blogWithoutLikes)
    const response = await newObject.save()
    const responseFromDb = await api.get(`/${response.id}`)
    expect(responseFromDb.body.likes).toEqual(0)
})


test('number of blogs', async () => {
    const response = await api.get('/')
    expect(response.body).toHaveLength(1)
})

test('blog content', async () => {
    const response = await api.get('/')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain("Go To Statement Considered Harmful")
})



afterAll(() => {
    mongoose.connection.close()
})
