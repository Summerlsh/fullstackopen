import React, {useState} from 'react'

import personService from '../services/persons'

const PersonForm = ({persons, setPersons, setMessage}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // 查找是不是有重复的人
    const found = persons.find(person => person.name === newName)
    const successCallback = () => {
      setNewName('')
      setNewNumber('')
      setMessage({
        text: `Added ${newName}`,
        type: 'success'
      })
      // 5 秒后清除消息
      setTimeout(() => setMessage({text: '', type: ''}), 5000)
    }

    if (found) {
      // 有则修改
      const newPerson = {...found, number: newNumber}

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.updatePerson(newPerson).then(resp => {
          const returnedPerson = resp.data
          setPersons(persons.map(p => p.id !== newPerson.id ? p : returnedPerson))
          successCallback()
        }).catch(error => {
          if (error.response.status === 404) {
            setPersons(persons.filter(p => p.id !== newPerson.id))
            setMessage({
              text: `Information of ${newName} has already been removed from server`,
              type: 'error'
            })
            // 5 秒后清除消息
            setTimeout(() => setMessage({text: '', type: ''}), 5000)
          }
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
        successCallback()
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
