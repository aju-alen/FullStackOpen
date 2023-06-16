import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [search, setSearch] = useState('')
  

  const handleSearch=(event)=>{
    setSearch(event.target.value)
    
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    const newObj = {
      name: newName.charAt(0).toUpperCase() + newName.slice(1),
      number: phoneNo
    }
    if (persons.findIndex(obj => obj.name.toLowerCase() === newObj.name.toLowerCase()) === -1) {
      setPersons(prev => [...prev, newObj])
    }
    else {
      alert(`${newObj.name} is already added to phonebook`)
    }
    setNewName('')
    setPhoneNo('')
  }




  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch}/>
        <h1>Add a New </h1>
      <PersonForm handleSubmit={handleSubmit} newName={newName}setNewName={setNewName} phoneNo={phoneNo} setPhoneNo={setPhoneNo}/>
      <h2>Numbers</h2>
      
      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App