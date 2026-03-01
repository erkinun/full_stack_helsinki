import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')

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
      <label htmlFor='search'>Filter shown with a</label>
      <input name='search' value={search} onChange={(e) => setSearch(e.target.value)}/>
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
          {persons.filter((p) => {
            if (search) {
              return p.name.toLowerCase().includes(search);
            }
            else {
              return p;
            }
          }).map((p) => (<div key={p.name}>{p.name} <span>{p.number}</span></div>))}
        </div>
      }
    </div>
  )
}

export default App