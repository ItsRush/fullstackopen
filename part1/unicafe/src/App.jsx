import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick = {props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
      <tr>
        <td>
          {props.text} 
        </td>
        <td>
          {props.value}
        </td>
      </tr>
  )
}

const Statistics = (props) => {
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  const total = props.good + props.neutral + props.bad
  const average = total > 0 ? total / 3 : 0
  const positive = total > 0 ? (props.good / total)*100 : 0
  return (
    <div>
      <StatisticLine text = 'good' value = {props.good}/>
      <StatisticLine text = 'neutral' value = {props.neutral}/>
      <StatisticLine text = 'bad' value = {props.bad}/>
      <StatisticLine text = 'total' value = {total}/>
      <StatisticLine text = 'average' value = {average}/>
      <StatisticLine text = 'positive' value = {positive}/>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


const handleGood = () => {
  const updateGood = good + 1
  setGood(updateGood)

}

const handleNeutral = () => {
  const updateNeutral = neutral + 1
  setNeutral(updateNeutral)
  
}

const handleBad = () => {
  const updateBad = bad +1
  setBad(updateBad)
  
}
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {handleGood} text = 'good' />
      <Button onClick = {handleNeutral}  text = 'neutral'/>
      <Button onClick = {handleBad}  text = 'bad'/>
      

      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App