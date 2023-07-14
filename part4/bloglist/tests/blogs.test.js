const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blogs = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./blogsHelperFunction')
const { isObject } = require('lodash')

let blogsList = [

    {
        title: "How to learn Full Stack",
        author: "Alen Aju",
        url: "http://www.orgo.com",
        likes: 35
    },
    {
        title: "Learn FS",
        author: "Baiju",
        url: "http://www.orgo.com",
        likes: 12
    }
]

beforeEach(async () => {
    await Blogs.deleteMany({})
    let newBlog = new Blogs(helper.blogsList[0])
    await newBlog.save()
    newBlog = new Blogs(helper.blogsList[1])
    await newBlog.save()

}, 100000)

test('verify if testblogs return correct ammount of blogs', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.blogsList.length)
})
test('verify if id and _id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    const mongoNote = await Blogs.find({})
    expect(mongoNote[0]._id).toBeDefined()

})

test('verify if post api works and length and content is reflected', async () => {
    const newBlog = {
        title: "Front End",
        author: "Makab",
        url: "http://www.orgo.com",

    }
    const oldData = await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const updatedData = await helper.getMongoData()
    const content = updatedData.map(obj => obj.title)
    expect(content).toContain("Front End")
})

test('check if like property is not added, it defaults it to zero', async () => {
    const newBlog = {
        title: "Front End",
        author: "Makab",
        url: "http://www.orgo.com"
    }
    const oldData = await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const updatedData = await helper.getMongoData()
    likesData = updatedData.map(obj => obj.likes)
    expect(likesData).toContain(0)
})

test('verify that if the title or url properties are missing from the request data', async () => {
    const newBlog = {
        author: "Makab",
        url: "http://www.orgo.com",
        likes: 27
    }
    const oldData = await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('verify that if blog gets deleted and length is reduced by 1', async () => {

    const updatedData = await helper.getMongoData()
    const idToDelete = updatedData[0].id
    const oldLength = updatedData.length
    await api.delete(`/api/blogs/${idToDelete}`)
        .expect(200)
    const newDB = await helper.getMongoData()
    expect(newDB.length).toBe(oldLength - 1)

})


test('verify that if blog gets updated,new contents are added', async () => {
    const newBlog = {
        title: 'Marc Stack',
        author: 'Zucc',
        url: 'http://www.orgo.com',
        likes: 24,
    }

    const updatedData = await helper.getMongoData()
    const idToUpdate = updatedData[0].id

    await api.put(`/api/blogs/${idToUpdate}`)
        .send(newBlog)
        .expect(200)
    const newDB = await helper.getMongoData()
    const titleTest = newDB.map(obj => obj.title)
    expect(titleTest).toContain('Marc Stack')

})

afterAll(async () => {
    await mongoose.connection.close()
    console.log('mongooseClosed');
})
