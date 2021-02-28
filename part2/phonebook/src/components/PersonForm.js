import React, {useState} from 'react'
import personService from '../services/persons'

const PersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // 查找是不是有重复的人
    const found = persons.find(person => person.name === newName)
    if (found) {
      // 有则修改
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const newPerson = {...found, number: newNumber}
        personService.updatePerson(newPerson).then(returnedPerson => {
          setPersons(persons.map(p => p.id !== newPerson.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      // 没有则新增
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService.addPerson(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <div>name: <input value={newName} onChange={e => setNewName(e.target.value)}/></div>
      <div>number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


export default PersonForm
