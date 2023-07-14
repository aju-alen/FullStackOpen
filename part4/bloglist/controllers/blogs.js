const blogsRouter = require('express').Router()
const Blogs = require('../models/blog')

blogsRouter.get('/', async (req, res, next) => {
    try {
        const data = await Blogs.find({})
        if (data) {
            res.json(data)
        } else {
            res.status(404).end()
        }
    } catch (err) {
        next(err)
    }

})

blogsRouter.post('/',async(req,res,next)=>{
    try{
    const newBlog = new Blogs(req.body)
    const data = await newBlog.save()
    if(data){
        res.status(201).json(data)
    }else{
        res.status(404).end()
    }
    }catch(err){
        next(err)
    }
    
})

module.exports = blogsRouter