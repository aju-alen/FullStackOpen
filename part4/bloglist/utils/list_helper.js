var _ = require('lodash');

const dummy = (blogs) => {
    return blogs
}
const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(obj => {
        sum += obj.likes
    }
    );
    return sum
}
const favoriteBlog = (blogs)=>{
    return blogs.find(obj=>obj.likes === Math.max(...blogs.map(obj=>obj.likes)) ) 
}
const mostBlogs  = (blogs)=>{
    const result = _(blogs)
  .groupBy('author')
  .map((blogs, author) => ({ author, blogs: blogs.length }))
  .maxBy('blogs');
  return result
}
const mostLikes  = (blogs)=>{
    const result = _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author, likes: _.sumBy(blogs, 'likes') }))
    .maxBy('likes');
  return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}