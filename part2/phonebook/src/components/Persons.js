import React, { useEffect } from 'react'

import Person from './Person'
import personService from '../services/persons'

const Persons = ({ persons, filter, setPersons }) => {

  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons)
    })
  }, [setPersons])

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)){
      personService.deletePerson(person.id).then(resp => {
        setPersons(persons.filter(p => person.id !== p.id))
      })
    }
  }

  return (
    <div>
      {
        persons
          .filter(person => person.name.search(new RegExp(filter, 'i')) !== -1)
          .map(person => <Person key={person.id} person={person} deletePerson={() => deletePerson(person)}/>)
      }
    </div>
  );
}

export default Persons
