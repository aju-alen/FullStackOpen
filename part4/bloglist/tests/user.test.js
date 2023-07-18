const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./blogsHelperFunction')
const  mongoose  = require('mongoose')

beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users')
    .send(helper.usersList[0])
    .expect(201)
    .expect('Content-Type',/application\/json/)
},100000)
test('post new user signup ', async() => { 
    const response=  await api.post('/api/users')
    .send(helper.usersList[1])
    .expect(201)
    .expect('Content-Type',/application\/json/)
 })

test('does not post if username already exists', async() => { 
    const response = await api.post('/api/users')
    .send(helper.usersList[2])
    .expect(400)
    .expect('Content-Type',/application\/json/)
    expect(response.body).toEqual( {
        error: 'User validation failed: username: Error, expected `username` to be unique. Value: `genT1e`'       
      });
 })
test('does not post if username is less than 3 characters', async() => { 
    const response = await api.post('/api/users')
    .send(helper.usersList[3])
    .expect(400)
    .expect('Content-Type',/application\/json/)
    expect(response.body).toEqual( {
        error: 'User validation failed: username: Path `username` (`ge`) is shorter than the minimum allowed length (3).'
      });
 })
 afterAll(async ()=>{
    await mongoose.connection.close()
 })