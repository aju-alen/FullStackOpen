import React from 'react'

const Person = ({data}) => {
  return (
    <p key={data.name}>{data.name} {data.number}</p>
  )
}

export default Person