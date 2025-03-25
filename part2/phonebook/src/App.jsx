import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [numbers, setNumbers] = useState([])
  const [newName, setNewName] = useState('')
  const [newSearch, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

  
  const handleRemoveName = (id) => {
    if(window.confirm(`Delete ${persons.name} ?`))
    console.log('removed name with id: ', id)

    personService
    .remove(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id ))
  })
  
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNumbers(event.target.value)
  }
  const handleShowAll = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) { 
      console.log('found: ',newName)
      alert(`${newName} is already added to phonebook`)
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person = persons.find(person=> person.name === newName)
          const id = person.id
          const changedPerson = { ...person, number: numbers }
          console.log('changed person: ',changedPerson)

          personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
          //If the person.id matches the id of the updated persons id replace that person with returnedPerson else keep the person unchanged
            setPersons(persons.map(person => person.id == id ? returnedPerson : person))
            setNewName('')
            setNumbers('')
          })
          .catch(error => {
            setNotification({message: `${newName} was already deleted from server` , type: 'error'})
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
          })
        }
        return
    }
    const nameObject = {
      name: newName,
      number: numbers
    }
    personService

      .create(nameObject)
      .then(returnedPerson=> {
        setNotification({ message: `Added ${newName}`, type: 'success'})
        setTimeout(() => {
          setNotification(null)
        }
        ,5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNumbers('')
      })
  }



  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Notification notification={notification} />
      </div>
      <Filter newSearch={newSearch} handleShowAll={handleShowAll} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} numbers={numbers} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons newSearch={newSearch} persons={persons} handleRemoveName={handleRemoveName}/>
    </div>
  )
}

export default App