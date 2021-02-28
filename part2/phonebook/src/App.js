import React, { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [keyword, setKeyword] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={keyword} setValue={setKeyword} />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={keyword} setPersons={setPersons} />
    </div>
  )
}

export default App
