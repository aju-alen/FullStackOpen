const  mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title: {type:String,required:true},
    author:{type:String,required:true},
    url: {type:String,required:true},
    likes: {type:Number,default:0}
  })

blogSchema.set('toJSON',{
    transform:(doc,retDoc)=>{
        retDoc.id = retDoc._id.toString();
        delete retDoc._id
        delete retDoc.__v
    }
})
module.exports =  mongoose.model('blog',blogSchema)