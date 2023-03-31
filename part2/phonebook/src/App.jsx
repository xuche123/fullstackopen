import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Notification from './Components/Notification'
import phonebookService from './Services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(0)

  useEffect(() => {
    phonebookService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      setType(0)
      setMessage('Name or number is empty')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    else {
      const personObj = {
        name: newName,
        number: newNumber,
      }

      if (persons.some(person => person.name === newName)) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person = persons.find(p => p.name === newName)
          phonebookService.updatePerson(person.id, personObj)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
              setType(1)
              setMessage(`Updated ${returnedPerson.name}`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
        }
      }
      else {
        phonebookService.create(personObj)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setType(1)
            setMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }).catch(error => {
            setType(0)
            setMessage(error.response.data.error)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
      setNewName('')
      setNewNumber('') 
    }
  }
  
  const deletePerson = (id) => {
    console.log(`delete ${id}`)
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        }).catch(error => {
          setType(0)
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
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
      <Notification message={message} type={type} />
      <Filter search={search} onChange={handleSearchChange} />
      <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App