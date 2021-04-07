import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import _ from 'lodash'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const { loading, data } = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const allGenres = _.uniq(
    data.allBooks.reduce((acc, cur) => {
      return acc.concat(cur.genres)
    }, [])
  )

  const BookItem = ({ book }) => (
    <tr>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )

  const books =
    genre === ''
      ? data.allBooks.map((book) => <BookItem key={book.title} book={book} />)
      : data.allBooks
        .filter((book) => book.genres.includes(genre))
        .map((book) => <BookItem key={book.title} book={book} />)

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <b>{genre === '' ? 'all genres' : genre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books}
        </tbody>
      </table>
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
