import { useState, useEffect } from 'react'
import personService from './services/personService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')


  useEffect(()=>{
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const filteredPersons = search ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())) : persons

  const handleName = (event)=>{
    setNewName(event.target.value)
  }
    const handleNumber = (event)=>{
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    
    if(!personToDelete){
      alert(`This person does not exist`)
      return
    }
    if(window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`${personToDelete.name} has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000);
        })
    }
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const existingPerson =  persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    
    if(!newName)
    {
      alert('cant add without a name')
    }

    if(existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        const updatedPerson = {...existingPerson, number: newNumber}
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
          })
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setSuccessMessage('')
          }, 5000);
      })
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App