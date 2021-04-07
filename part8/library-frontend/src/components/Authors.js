import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, SET_AUTHOR_BORN } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const { loading, data } = useQuery(ALL_AUTHORS)
  const [setAuthorBorn] = useMutation(SET_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  let selectRef

  if (!props.show) {
    return null
  }
  if (loading) {
    return <div>loading...</div>
  }

  const handleClick = (e) => {
    setAuthorBorn({ variables: { name: name.value, born: +born } })
    selectRef.select.clearValue()
    setBorn('')
  }

  const authorOptions = data.allAuthors.map((author) => ({
    label: author.name,
    value: author.name,
  }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {props.token && (
        <div>
          <h3>Set birthyear</h3>
          <div>
            <Select
              defaultValue={name}
              onChange={setName}
              options={authorOptions}
              ref={(ref) => (selectRef = ref)}
            />
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button onClick={handleClick}>update author</button>
        </div>
      )}
    </div>
  )
}

export default Authors
