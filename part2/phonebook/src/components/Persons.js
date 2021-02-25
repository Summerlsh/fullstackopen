const Person = ({persons, filter}) => (
  <div>
    {
      persons
        .filter(person => person.name.search(new RegExp(filter, 'i')) !== -1)
        .map(person => <div key={person.name}>{person.name} {person.number}</div>)
    }
  </div>
)

export default Person
