const Header = ({name}) =>{
  return(
    <h1>{name}</h1>
  )
}

const Part = ({part}) =>{
  return(
    <li>{part.name} {part.exercises}</li>
  )
}
const Content = ({parts}) => {
  return(
    <>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </>
  )
}

const Sum = ({parts}) =>{
  const total = parts.reduce((sum,part) => {
    console.log('what is happening', sum, part)
    return sum+part.exercises
  }, 0)
  return(
    <p>total of {total} exercises</p>
  )
}
const Course = ({course})=>{
  return(
    <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Sum parts={course.parts} />
    </>
  )
}


export default Course