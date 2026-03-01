export const PersonForm = ({formSubmitFn, newName, setNewName, phoneNumber, setPhoneNumber}) => {
  return (
    <form onSubmit={formSubmitFn}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>number: <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}