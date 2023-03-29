import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      alert('Please enter a name and number')
      return
    }
    else {
      const personObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      if (persons.some(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
      }
      else {
        setPersons(persons.concat(personObj))
      }
      setNewName('')
      setNewNumber('') 
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(search))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={handleSearchChange} />
      <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />

    </div>
  )
}

export default App