const Header = (props) => <h2>{props.course}</h2>

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

const Total = (props) => <p style={{fontWeight: 'bold'}}>total of {props.total} exercises</p>

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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <main>
    <h1>Web development cirriculum</h1>
    {
      courses.map((c) => (<Course course={c} />))
    }
  </main>
}

export default App
