import React from 'react'

const PersonForm = ({handleSubmit,newName,setNewName,phoneNo,setPhoneNo}) => {
  return (
    <form onSubmit={handleSubmit}>
        
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />

        </div>
        <div>
          Phone No: <input value={phoneNo} onChange={(event) => setPhoneNo(event.target.value)} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
  )
}

export default PersonForm