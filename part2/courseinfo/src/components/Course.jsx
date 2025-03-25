const Header = (props) => {
    return (
      <div>
       <h1>{props.name}</h1>
      </div>
    )
  }
  const Content = (props) => {
    console.log(props)
    return (
      <div>
        {props.parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  }
  const Part = (props) => {
    return (
      <div>
        <p>{props.part.name} {props.part.exercises}</p>
      </div>
    )
  }
  const Total = (props) => {
    console.log(props)
    const total = props.parts.reduce((sum, part) => sum+part.exercises,0)
    return (
      <div> 
        <p>Number of exercises {total}</p>
      </div>
    )
  }
  const Course = (props) => {
    console.log(props)
    return (
      <div>
        <Header name={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts= {props.course.parts} />
      </div>
    )
  }

  export default Course