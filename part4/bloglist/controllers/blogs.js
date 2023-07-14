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

blogsRouter.delete('/:id',async (req,res,next) => {
    try{
        const deletedData = await Blogs.findByIdAndDelete(req.params.id)
        if(deletedData){
            res.json(deletedData)
        }else{
            res.status(410).json({message:'cannot find id to delete'})
        }
    }catch(err){
        next(err)
    }
})

blogsRouter.put('/:id',async (req,res,next) => {
    try{
        const updatedData = req.body
        const findBlog = await Blogs.findByIdAndUpdate(req.params.id,updatedData, { new: true,runValidators:true,context:'query' })
        if(findBlog){
            res.json(updatedData)
        }else{
            res.status(410).json({message:'cannot find id to update'})
        }
    }catch(err){
        next(err)
    }
})

module.exports = blogsRouter