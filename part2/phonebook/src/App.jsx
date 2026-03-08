import { useEffect, useState } from 'react'
import {create, deleteId, getAll} from './services/phones'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import { Persons } from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getAll()
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

    const newPhoneNumber = {
      name: newName,
      number: phoneNumber
    }

    create(newPhoneNumber)
      .then(response => {
        setPersons((prev) => prev.concat(response.data))
      })
    setPhoneNumber('')
    setNewName('')
  }

  const handleDelete = (id) => {

    if (window.confirm(`Delete : ${persons.find((p) => p.id === id)?.name}`)) {
      deleteId(id)
      .then(getAll)
      .then((response) => setPersons(response.data))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <PersonForm formSubmitFn={formSubmitFn} 
        newName={newName} setNewName={setNewName} 
        phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} onDelete={handleDelete}/>
    </div>
  )
}

export default App
