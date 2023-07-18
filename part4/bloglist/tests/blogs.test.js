const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blogs = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./blogsHelperFunction')
const { isObject } = require('lodash')
let token;
beforeAll(async () => {
    await User.deleteMany({})
    const signupObj = {
        username: "Ale_n",
        name: "Alen",
        password: "alen6344"
    }
    const signup = await api.post('/api/users')
        .send(signupObj)

    const loginObj = {
        username: "Ale_n",
        password: "alen6344"
    }
    const login = await api.post('/api/login')
        .send(loginObj)
    token = login.body.token
}, 100000)

beforeEach(async () => {
    await Blogs.deleteMany({})
    let newBlog = new Blogs(helper.blogsList[0])
    await newBlog.save()
    newBlog = new Blogs(helper.blogsList[1])
    await newBlog.save()

}, 100000)

test('verify if testblogs return correct ammount of blogs', async () => {

    const response = await api.get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.blogsList.length)
})
test('verify if id and _id is defined', async () => {
    const response = await api.get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
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
    await api.post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const updatedData = await helper.getBlogsData()
    expect(updatedData.length).toEqual(helper.blogsList.length + 1)
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
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const newData = await Blogs.findOne({ title: "Front End" })
    expect(newData.likes).toEqual(0)
})

test('verify that if the title or url properties are missing from the request data', async () => {
    const titleBlog = {
        author: "Makab",
        url: "http://www.orgo.com",
        likes: 27
    }
    await api.post('/api/blogs')
        .send(titleBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

    const urlBlog = {
        title: "New Learn",
        author: "Makab",
        likes: 27
    }
    await api.post('/api/blogs')
        .send(urlBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
})

test('verify that if blog gets deleted and length is reduced by 1', async () => {

    const newBlog = {
        title: "Front End",
        author: "Makab",
        url: "http://www.orgo.com"
    }
    const oldData = await api.post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const updatedData = await helper.getBlogsData()
    const idToDelete = updatedData[2].id
    const oldLength = updatedData.length

    await api.delete(`/api/blogs/${idToDelete}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    const newDB = await helper.getBlogsData()
    expect(newDB.length).toBe(oldLength - 1)
})


test('verify that if blog gets updated,new contents are added', async () => {
    const newBlog = {
        title: 'Marc Stack',
        author: 'Zucc',
        url: 'http://www.orgo.com',
        likes: 24,
    }

    const updatedData = await helper.getBlogsData()
    const idToUpdate = updatedData[0].id

    await api.put(`/api/blogs/${idToUpdate}`)
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    const newDB = await helper.getBlogsData()
    const titleTest = newDB.map(obj => obj.title)
    expect(titleTest).toContain('Marc Stack')

})

test('verify that if blog gets posted without a token, it gets Internal Server Error', async () => {

    const newBlog = {
        title: "Front End",
        author: "Makab",
        url: "http://www.orgo.com"
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
})
afterAll(async () => {
    await mongoose.connection.close()
    console.log('mongooseClosed');
})
