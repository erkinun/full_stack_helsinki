import { useState } from 'react'

const StatisticsLine = ({title, value}) => {
  return (<tr><td>{title}</td><td>{value}</td></tr>);
}

const Statistics = ({good, neutral, bad, all, points}) => {
  return (
    <section>
      <h2>Statistics</h2>
      {all === 0 ? <div>No feedback given</div> : (
        <table>
          <tbody>
            <StatisticsLine title="Good" value={good} />
            <StatisticsLine title="Neutral" value={neutral} />
            <StatisticsLine title="Bad" value={bad} />
            <StatisticsLine title="All" value={all} />
            <StatisticsLine title="Average" value={all === 0 ? 'NA' : points / all} />
            <StatisticsLine title="Positive" value={all === 0 ? 'NA' : `${(good / all) * 100}%`} />
          </tbody>
        </table>
      )}

    </section>
  )
}

const inc = (prev) => prev + 1;
const Button = ({text, statefn}) => {
  return (
    <button onClick={() => statefn(inc)}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad;
  const points = good * 1 + (bad * -1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' statefn={setGood} />
      <Button text='neutral' statefn={setNeutral} />
      <Button text='bad' statefn={setBad} />
      
      <Statistics good={good} neutral={neutral} bad={bad} all={all} points={points} />
    </div>
  )
}

export default App