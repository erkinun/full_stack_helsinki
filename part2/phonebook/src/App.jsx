import { useEffect, useState } from 'react'
import {create, deleteId, getAll, update} from './services/phones'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import { Persons } from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const refreshPhoneBook = () => {
    getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(() => {
    refreshPhoneBook();
  }, [])

  const clearNotification = () => {
    setTimeout(() => {
      setNotificationMsg(null)
      setIsError(false);
    }, 2000);
  }

  useEffect(() => {
    clearNotification()
  }, [notificationMsg])

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
          .then(() => setNotificationMsg(`${existing.name}'s number is updated`))
          .catch(e => {
            setNotificationMsg(`${existing.name} is deleted from phonebook`)
            setIsError(true);
            refreshPhoneBook();
          })
      }
      return;
    }

    create(newPhoneNumber)
      .then(response => {
        setPersons((prev) => prev.concat(response.data))
      })
    setPhoneNumber('')
    setNewName('')
    setNotificationMsg(`Added ${newName}`)
  }

  const handleDelete = (id) => {

    if (window.confirm(`Delete : ${persons.find((p) => p.id === id)?.name}`)) {
      deleteId(id)
      .then(getAll)
      .then((response) => setPersons(response.data))
      .catch(e => {
        setNotificationMsg(`Person is already deleted from phonebook`)
        setIsError(true);
        refreshPhoneBook();
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMsg} isError={isError} />
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
