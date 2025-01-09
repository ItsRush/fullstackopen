import { useState } from 'react'

const Statistics = (props)=>{
  if(props.total === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <table>
      <tbody>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={props.total}/>
      <StatisticLine text="average" value={(props.good-props.bad)/props.total}/>
      <StatisticLine text="positive" value={(props.good/props.total)*100 + "%"}/>
      </tbody>
    </table>
  )
}
const StatisticLine = (props)=>{
  return(
    <tr>
      <td>{props.text} {props.value}</td>
    </tr>
  )
}
const Button = (props)=>{
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [clicks,setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })
  const [total, setTotal] = useState(0)

  const handleGoodClick = () =>{
    const newClicks = {...clicks, good: clicks.good+1}
    setClicks(newClicks)
    setTotal(total+1)
  }
 
  const handleNeutralClick = () =>{
    const newClicks = {...clicks, neutral: clicks.neutral+1}
    setClicks(newClicks)
    setTotal(total+1)
  }

  const handleBadClick = () =>{
    const newClicks = {...clicks, bad: clicks.bad+1}
    setClicks(newClicks)
    setTotal(total+1)
  }
  
  return (
    <div>
      <h3>give feedback</h3>

      <div>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      </div>

      <h3>statistics</h3>
      <Statistics good={clicks.good} neutral={clicks.neutral} bad={clicks.bad} total={total}/>
    </div>
  )
}

export default App