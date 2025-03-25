const Persons = ({newSearch,persons,handleRemoveName}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

    const Person = ({ person }) => {
        return (
          <li>{person.name} {person.number} <button onClick = {()=> handleRemoveName(person.id,person.name)}>delete</button></li>
        )
      }
    return (
        <ul>
        
        {personsToShow.map(person=>
            <Person key={person.id} person={person}/>
        )}
      </ul>
    )
}

export default Persons;