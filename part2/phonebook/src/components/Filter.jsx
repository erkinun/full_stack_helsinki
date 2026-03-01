export const Filter = ({search, setSearch}) => {
  return (
    <>
      <label htmlFor='search'>Filter shown with a</label>
      <input name='search' value={search} onChange={(e) => setSearch(e.target.value)}/>
    </>
  )
}