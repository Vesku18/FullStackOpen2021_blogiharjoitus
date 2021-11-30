const config = require('../utils/config')
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

test('blogs overeall', async () => {
    const prom = await api
        .get('/api/blogs')
        .set('Authorization',config.TEST_TOKEN)
        expect(prom.status).toEqual(200)
        expect(prom.header['content-type']).toContain('application/json')
})

test('id exists', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization',config.TEST_TOKEN)
    expect(response.body[0].id).toBeDefined()
})

test('likes has default value', async () => {
    const response = await api
        .post('/api/blogs')
        .set('Authorization',config.TEST_TOKEN)
        .send(helper.blogWithoutLikes)

    console.log("Mitätuli:",response.body)
    const responseFromDb = await api
        .get(`/api/blogs/${response.body.id}`)
        .set('Authorization',config.TEST_TOKEN)
    expect(responseFromDb.body.likes).toEqual(0)
})


test('number of blogs', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization',config.TEST_TOKEN)
    expect(response.body).toHaveLength(1)
})

test('blog content', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization',config.TEST_TOKEN)

    console.log(response.body)
    const contents = response.body.map(r => r.title)
    expect(contents).toContain("Go To Statement Considered Harmful")
})



afterAll(() => {
    mongoose.connection.close()
})
