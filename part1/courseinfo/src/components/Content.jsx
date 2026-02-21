export function Content({part1, exercises1, part2, exercises2, part3, exercises3}) {
    return (
      <>
        <Part part={part1} exerciseCount={exercises1} />
        <Part part={part2} exerciseCount={exercises2} />
        <Part part={part3} exerciseCount={exercises3} />
      </>
    );
}

function Part({part, exerciseCount}) {
  return (<p>{part} {exerciseCount}</p>)
}