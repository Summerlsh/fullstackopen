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
      const id = found.id
      const newPerson = {
        name: found.name,
        number: newNumber
      }

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.updatePerson(id, newPerson).then(resp => {
          const returnedPerson = resp.data
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          successCallback()
        }).catch(error => {
          if (error.response.status === 404) {
            setPersons(persons.filter(p => p.id !== newPerson.id))
            setMessage({
              text: `Information of ${newName} has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => setMessage({text: '', type: ''}), 5000)
          }
          if (error.response.status === 400) {
            const data = error.response.data
            setMessage({
              text: data.error,
              type: 'error'
            })
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

      personService.addPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          successCallback()
        })
        .catch(err => {
          const data = err.response.data
          setMessage({
            text: data.error,
            type: 'error'
          })
          setTimeout(() => setMessage({text: '', type: ''}), 5000)
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
