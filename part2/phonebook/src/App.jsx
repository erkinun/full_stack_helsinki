import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '21312312321' }
  ]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const formSubmitFn = (e) => {
    e.preventDefault()
    if (persons.find(({name}) => name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons((prev) => [...prev, {name: newName, phoneNumber: phoneNumber}])
    setPhoneNumber('')
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmitFn}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>number: <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        <div>
          {persons.map((p) => (<div key={p.name}>{p.name} <span>{p.phoneNumber}</span></div>))}
        </div>
      }
    </div>
  )
}

export default App