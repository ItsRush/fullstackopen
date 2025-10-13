const Person = ({persons, search, handleRemove}) => {
  const filteredPersons = search ? persons.filter(person => person.name.toLowerCase() === search.toLowerCase()) : persons
  
  
  return(
        <div>
            <ul>
                {filteredPersons.map(person =>
                    <li key = {person.id}>
                        {person.name} {person.number} <button onClick = {() => handleRemove(person.id)}>delete</button>
                    </li>
                 )}
            </ul>
        </div>
    )
}

export default Person;