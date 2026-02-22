import { useState } from 'react'

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
      <button onClick={() => setGood(prev => prev + 1)}>good</button>
      <button onClick={() => setNeutral(prev => prev + 1)}>neutral</button>
      <button onClick={() => setBad(prev => prev + 1)}>bad</button>

      <section>
        <h2>Statistics</h2>

        <div>Good: {good}</div>
        <div>Neutral: {neutral}</div>
        <div>Bad: {bad}</div>
        <div>All: {all}</div>
        <div>Average {all === 0 ? 'NA' : points / all}</div>
        <div>Positive {all === 0 ? 'NA' : (good / all) * 100}%</div>
      </section>
    </div>
  )
}

export default App