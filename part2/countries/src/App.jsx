import { useEffect, useState } from 'react'
import axios from 'axios'
import SingleCountry from './components/SingleCountry'
import RenderList from './components/RenderList'

function App() {
  const [data,setData] = useState([])
  const [search,setSearch] = useState('')
  const [limit,setLimit] = useState('')


  const handleSearch =(event)=>{
    setSearch(event.target.value)
    
  }
  const handleClick=(name)=>{
    
    
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`).then(response=>{
      const dataArray = [response.data]
      setData(dataArray)
      setLimit('one')
    })
  }

  const searchData = ()=>{
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(response=>{

      if(search!==''){
        const filteredSearchArray= response.data.filter(obj=>obj.name.common.toLowerCase().includes(search.toLowerCase()))
        setData(filteredSearchArray)
        if(filteredSearchArray.length > 10 && search.length>=1) setLimit('limit')
        else if(filteredSearchArray.length === 1)setLimit('one')
        else if(filteredSearchArray.length <= 10)setLimit('many')
        
      }
    })
  }
  const renderData= data.map(obj=>(
    <RenderList handleClick={()=>handleClick(obj.name.common)} key={obj.area} name={obj.name.common} />
  ))
  useEffect(searchData,[search]) 
  

  return (
    <div>
    <div>
     Find Countries<input onChange={handleSearch} value={search} />
     </div>
    {limit==='limit' && 'Too many matches,specify another filter'}
    {limit==='many' && renderData}
    {limit==='one' && (<SingleCountry data={data}/>)}
    </div>
  )
}

export default App
