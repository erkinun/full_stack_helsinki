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

export const Course = ({course: {name, parts}}) => {
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total total={
          parts.map(({exercises}) => exercises).reduce((prev, agg) => prev + agg, 0)} />
    </div>
  )
}