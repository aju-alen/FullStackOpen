import React from 'react'

const Person = ({ data, deleteModal }) => {


  return (
    <div>
      <p >
        {data.name} {data.number}
        <button onClick={deleteModal}>Delete</button>
      </p>
    </div>
  )
}

export default Person