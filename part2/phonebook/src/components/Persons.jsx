export const Persons = ({persons, search, onDelete}) => {
  return (
    <div>
      {persons.filter((p) => {
        if (search) {
          return p.name.toLowerCase().includes(search);
        }
        else {
          return p;
        }
      }).map((p) => (<div key={p.name}>{p.name} <span>{p.number}</span><button onClick={() => onDelete(p.id)}>Delete</button></div>))}
    </div>
  )
}