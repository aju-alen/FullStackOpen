const Blogs = require('../models/blog')
const getMongoData = async ()=>{
const data = await Blogs.find({})
const result = data.map(obj=>obj.toJSON())
return result
}

module.exports = {getMongoData}