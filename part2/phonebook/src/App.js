import React, { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [keyword, setKeyword] = useState('')
  const [message, setMessage] = useState({text: '', type: ''})

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={message.text} type={message.type}/>
      <Filter value={keyword} setValue={setKeyword}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={keyword} setPersons={setPersons}/>
    </div>
  )
}

export default App
