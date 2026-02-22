export function Content({parts }) {
    return (
      <>
        {
          parts.map(({name, exercises}) => (<Part key={name} name={name} exerciseCount={exercises} />))
        }
      </>
    );
}

function Part({name, exerciseCount}) {
  return (<p>{name} {exerciseCount}</p>)
}