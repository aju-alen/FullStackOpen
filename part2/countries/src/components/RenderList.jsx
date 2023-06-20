import React from 'react'

const RenderList = ({name,handleClick}) => {

  return (
    <div>
        <p>{name} <button onClick={handleClick}>Show</button> </p>
    </div>
  )
}

export default RenderList