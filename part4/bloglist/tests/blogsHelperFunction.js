const Blogs = require('../models/blog')
const getMongoData = async ()=>{
const data = await Blogs.find({})
const result = data.map(obj=>obj.toJSON())
return result
}
let blogsList =[
    
    {
        title:"How to learn Full Stack",
        author:"Alen Aju",
        url:"http://www.orgo.com",
        likes:35
    },
    {
        title:"Learn FS",
        author:"Baiju",
        url:"http://www.orgo.com",
        likes:12
    }
    ]

module.exports = {getMongoData,blogsList}