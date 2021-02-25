import Person from './Person'

const Persons = ({ persons, filter }) => (
  <div>
    {
      persons
        .filter(person => person.name.search(new RegExp(filter, 'i')) !== -1)
        .map(person => <Person person={person} />)
    }
  </div>
)

export default Persons
