import React from 'react'
import Person from './Person'

const Persons = ({persons,search}) => {
    const allRender= persons.filter(obj=> obj.name.toLowerCase().includes(search.toLowerCase())).map(data => (
       <Person key={data.name} data={data} />
      ))
  return (
    <div>{allRender}</div>
  )
}

export default Persons