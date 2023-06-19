import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import phoneBookServices from './services/phoneBook'


const App = () => {
  const [persons, setPersons] = useState([])
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
     phoneBookServices.createPhoneBookData(newObj)
      .then(response=>{
        setPersons(prev => [...prev, response])
      })
    }
    else {
      let message = `${newObj.name} is already added to phonebook, relace the old number with the new number`
      if(confirm(message)){
         const obj = persons.filter(obj => obj.name.toLowerCase() === newObj.name.toLowerCase()) 
         const id = obj[0].id 
         phoneBookServices.updateRecord(id, newObj)
         .then(data=>{
          setPersons(persons.map(obj=>obj.id !== data.id? obj : data))
         })
      }
    }
    setNewName('')
    setPhoneNo('')
  }

const axiosData=()=>{
  phoneBookServices.getPhoneBookData().then(response=>{
    setPersons(response)
  })
}

const deleteModal = (id, name) => {
  if (confirm(`Delete ${name} of id ${id} `)) {
    phoneBookServices.deleteRecord(id).then()
  }
  setPersons(prev => prev.filter(obj => obj.id !== id))
}


  useEffect(axiosData,[])
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch}/>
        <h1>Add a New </h1>
      <PersonForm handleSubmit={handleSubmit} newName={newName}setNewName={setNewName} phoneNo={phoneNo} setPhoneNo={setPhoneNo}/>
      <h2>Numbers</h2>
      
      <Persons deleteModal={deleteModal} setPersons={setPersons} persons={persons} search={search} />
    </div>
  )
}

export default App