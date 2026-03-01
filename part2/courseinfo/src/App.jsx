const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {
      props.parts.map((p) => (<Part part={p} />))
    }
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>total of {props.total} exercises</p>

const Course = ({course: {name, parts}}) => {
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total total={
          parts.map(({exercises}) => exercises).reduce((prev, agg) => prev + agg, 0)} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return <Course course={course} />
}

export default App