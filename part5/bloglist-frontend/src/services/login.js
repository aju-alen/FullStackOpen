import axios from "axios";
const baseUrl = '/api/login'

const login = async loginObj=>{
    const response = await axios.post(baseUrl,loginObj)
    return response.data    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {login}