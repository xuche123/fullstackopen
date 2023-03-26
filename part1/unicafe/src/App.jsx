import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{ text }</button> 

const Header = ({handleClick}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=> handleClick(1)} text="good" />
      <Button handleClick={() => handleClick(0)} text="neutral" />
      <Button handleClick={() => handleClick(-1)} text="bad" />
    </div>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  
  const all = good + neutral + bad
  const average = (good * 1 + bad * -1) / all
  const positive = good / all * 100 + '%'

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" count={good} />
          <StatisticLine text="neutral" count={neutral} />
          <StatisticLine text="bad" count={bad} />
          <StatisticLine text="all" count={all} />
          <StatisticLine text="average" count={average} />
          <StatisticLine text="positive" count={positive} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, count }) => <tr>{text} {count}</tr>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (choice) => {
    if (choice === 0) {
      setNeutral(neutral + 1)
    } 
    else if (choice === 1) {
      setGood(good + 1)
    }
    else {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <Header handleClick={handleClick} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App