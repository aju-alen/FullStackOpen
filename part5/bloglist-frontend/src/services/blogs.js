import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null;

const getToken = (userToken) =>{
  token = `Bearer ${userToken}`
}
const getAll = () => {
  let header = {
    headers:{Authorization:token}
  } 
  const request = axios.get(baseUrl,header)
  return request.then(response => response.data)
}

const createNewBlog = async (newBlogObj) => {
  const config = {
    headers:{Authorization:token}
  }
  const newBlog = await axios.post(baseUrl,newBlogObj,config)
  return newBlog.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,getToken,createNewBlog}