import { useState } from 'react'
const Button = ({ click, text }) => {

  return (
    <>

      <button onClick={click} >{text}</button>

    </>
  )
}

const StatisticsLine = ({ text, value }) => {

  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = ({ good, bad, neutral, all, statisticsState }) => {

  return (
    <>
      {statisticsState ? (
        <>
          <tr>
            <h1>statistics</h1>
          </tr>
          <StatisticsLine text={"good"} value={good} />
          <StatisticsLine text={"neutral"} value={neutral} />
          <StatisticsLine text={"bad"} value={bad} />
          <StatisticsLine text={"all"} value={all} />
          <StatisticsLine text={"average"} value={(good - bad) / all} />
          <StatisticsLine text={"positive"} value={(good / all) * 100} />

        </>
      ) : <h1>No Feedback Given</h1>}

    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [statisticsState, setStatisticsState] = useState(false)

  const click = setState => () => {
    setState(prev => prev + 1)
    setStatisticsState(true)
  }

  const all = good + bad + neutral


  return (
    <div>
      <h1>give feedback</h1>
      <table>
        <tr>
          <Button text={'good'} click={click(setGood)} />
          <Button text={'neutral'} click={click(setNeutral)} />
          <Button text={'bad'} click={click(setBad)} />
        </tr>

        <Statistics good={good} neutral={neutral} bad={bad} all={all} statisticsState={statisticsState} />
      </table>

    </div>
  )
}

export default App