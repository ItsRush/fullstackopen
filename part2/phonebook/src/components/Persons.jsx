const Persons = ({filteredPersons, handleDelete}) => {
    return(
      <div>{filteredPersons.map(person =>
        <li key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button> </li>
      )}</div>
    )
}

export default Persons