import { useEffect, useState } from 'react'
import axios from 'axios'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import { Persons } from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const formSubmitFn = (e) => {
    e.preventDefault()
    if (persons.find(({name}) => name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons((prev) => [...prev, {name: newName, number: phoneNumber}])
    setPhoneNumber('')
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <PersonForm formSubmitFn={formSubmitFn} 
        newName={newName} setNewName={setNewName} 
        phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} search={search}/>
    </div>
  )
}

export default App
