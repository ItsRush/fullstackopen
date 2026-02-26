import { useState } from 'react'

const Button = ({onClickGood, onClickNeutral, onClickBad}) => {
  return(
    <>
      <h1>give feedpack</h1>
      <button onClick={onClickGood}>good</button>
      <button onClick={onClickNeutral}>neutral</button>
      <button onClick={onClickBad}>bad</button>
    </>
  )
}
const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const averageScore = total === 0 ? 0 : (good - bad)/total
  const positiveScore = total === 0 ? 0 : (good/total) * 100
  const positivePer = `${positiveScore} %`
  const averagePer = `${averageScore} %`

  if(good === 0 && neutral === 0 && bad === 0){
    return <p>No feedback given</p>
  }else{
    return(
        <div>
        <h1>statistics</h1>
          <table>
            <tbody>
              <StatisticLine text='good' value={good} />
              <StatisticLine text='neutral' value={neutral} />
              <StatisticLine text='bad' value={bad} />
              <StatisticLine text='average' value={averagePer} />
              <StatisticLine text='positive' value={positivePer}/>
          </tbody>
          </table>
        </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => setGood( good + 1)
  const setToNeutral = () => setNeutral( neutral + 1)
  const setToBad = () => setBad( bad + 1)
  return (
    <div>
      <Button onClickGood={setToGood} onClickNeutral={setToNeutral} onClickBad={setToBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App