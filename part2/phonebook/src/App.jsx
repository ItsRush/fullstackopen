import { useState, useEffect } from 'react'
import  Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'
import personService from './services/personService'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const[search, setSearch] = useState('')
  const[errorMessage, setErrorMessage] = useState('')
  const[successMessage, setSuccessMessage] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
console.log('render', persons.length, 'persons' )


  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleRemove = (id) => {
    const personToDelete = persons.find(person=> person.id === id)
    if(window.confirm(`${`Delete ${personToDelete.name} ? `}`))
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleNewNumber = (id) => {
    const person = persons.find(person => person.id === id)
    const changedNumber = {...person, number:newNumber}
    personService
      .update(id, changedNumber)
      .then(returnedPerson => {
        setPersons(persons.map(person=> person.id === id ? returnedPerson : person))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(`Information of ${person.name} has already been removed from the server`)
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000);
      })
  }
  const newPerson = (event) => {
    console.log('adding---', event.target)
    event.preventDefault()
    const personObject = {
      name: newName,
      number : newNumber
    }
    const duplicate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if(duplicate){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        handleNewNumber(duplicate.id)
        return
      }
      return
    }
    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setSuccessMessage(`Added ${returnedPerson.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000);
      setNewName('')
      setNewNumber('')
    })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      <Filter search ={search} handleSearch={handleSearch}/>
      <h1>add a new</h1>
      <Form newPerson={newPerson} newName = {newName} newNumber={newNumber} handleName= {handleName} handleNumber ={handleNumber} />
      <h2>Numbers</h2>
      <Person persons = {persons} search = {search} handleRemove={handleRemove}/>
    </div>
  )
}

export default App