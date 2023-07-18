const Blogs = require('../models/blog')
const User = require('../models/user')

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
let usersList = [

    {
        username:"genT1e",
        name:"Alen",
        password:"alen6344"
    },
    {
        username:"boxer",
        name:"Martin",
        password:"martin6344"
    },
    {
        username:"genT1e",
        name:"Martin",
        password:"alen6344"
        
    },
    {
        username:"ge",
        name:"Martin",
        password:"alen6344"
        
    }
]

const getBlogsData = async () => {
    const data = await Blogs.find({})
    const result = data.map(obj => obj.toJSON())
    return result
}

const getUserData = async () => {
    const data = await User.find({})
    const result = data.map(obj => obj.toJSON())
    return result
}

module.exports = { getBlogsData, getUserData, blogsList,usersList}