export function Content({part1, part2, part3, }) {
    return (
      <>
        <Part name={part1.name} exerciseCount={part1.exercises} />
        <Part name={part2.name} exerciseCount={part2.exercises} />
        <Part name={part3.name} exerciseCount={part3.exercises} />
      </>
    );
}

function Part({name, exerciseCount}) {
  return (<p>{name} {exerciseCount}</p>)
}