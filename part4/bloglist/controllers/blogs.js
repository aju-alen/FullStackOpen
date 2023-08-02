const blogsRouter = require('express').Router()
const Blogs = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')



blogsRouter.get('/', async (req, res, next) => {
    try {
        const data = await Blogs.find({}).populate('user', { blogList: 0 })
        if (data) {
            res.json(data)
        } else {
            res.status(404).end()
        }
    } catch (err) {
        next(err)
    }

})

blogsRouter.post('/', async (req, res, next) => {
   
    try {
        const { title, author, url, likes } = req.body
        const decodedToken = jwt.verify(req.token, SECRET)
        console.log(decodedToken);
        const username = req.user.username
        
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const newBlog = new Blogs({
            title,
            author,
            url,
            likes,
            user: user._id
        })

        const data = await newBlog.save()
        if (data) {
            user.blogList = user.blogList.concat(data._id)
            await user.save()
            res.status(201).json({data,username})
        } else {
            res.status(404).end()
        }
    } catch (err) {
        next(err)
    }

})

blogsRouter.delete('/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, SECRET)
        const username = req.user.username
        const findDataToDelete = await Blogs.findById(req.params.id)
        if(findDataToDelete.user.toString() === decodedToken.id){
            const deletedData = await Blogs.findByIdAndDelete(req.params.id)
            res.json(deletedData)
        }     
        else {
            res.status(410).json({ message: 'cannot find id to delete' })
        }
    } catch (err) {
        next(err)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    try {
        const updatedData = req.body
        const findBlog = await Blogs.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true, context: 'query' })
        if (findBlog) {
            res.json(updatedData)
        } else {
            res.status(410).json({ message: 'cannot find id to update' })
        }
    } catch (err) {
        next(err)
    }
})

module.exports = blogsRouter