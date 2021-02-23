import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  return all === 0 ? (
    <div>No feedback given</div>
  ) : (
    <table>
      <tbody>
      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Statistic text="all" value={all}/>
      <Statistic text="average" value={(good - bad) / all}/>
      <Statistic text="positive" value={good / all * 100 + '%'}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)

