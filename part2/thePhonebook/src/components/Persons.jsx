import React from 'react'
import Person from './Person'


const Persons = ({persons,search,deleteModal}) => {
    const allRender= persons.filter(obj=> obj.name?.toLowerCase().includes(search.toLowerCase()) ).map(data => {
     return <Person deleteModal={()=>deleteModal(data.id,data.name)} key={data.name} data={data} />
    }
      )
      
  return (
    <div>{allRender}</div>
  )
}

export default Persons