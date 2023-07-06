import axios from "axios";
const baseURL= "api/persons"


const getPhoneBookData = ()=>axios.get(baseURL).then(response=>response.data)

const createPhoneBookData= (newObj)=>{
    return axios.post(baseURL,newObj).then(response=>response.data)
}

const deleteRecord= (id)=>{
    return axios.delete(`${baseURL}/${id}`).then(response=>response)
}

const updateRecord =(id,newObj)=>{
   return axios.put(`${baseURL}/${id}`,newObj).then(response=>response.data)
} 

export default {getPhoneBookData, createPhoneBookData, deleteRecord,updateRecord}
