import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(resp => {
        setPersons(resp.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={keyword} setValue={setKeyword} />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={keyword} />
    </div>
  )
}

export default App
