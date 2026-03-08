import { useEffect, useState } from 'react'
import {create, deleteId, getAll, update} from './services/phones'
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
    const newPhoneNumber = {
      name: newName,
      number: phoneNumber
    }
    const existing = persons.find(({name}) => name === newName)
    if (existing) {
      if (confirm(`${existing?.name} is already added to phonebook, replace the old number with a new one?`)) {
        update(existing.id, newPhoneNumber)
          .then(getAll)
          .then(r => setPersons(r.data))
      }
      return;
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
