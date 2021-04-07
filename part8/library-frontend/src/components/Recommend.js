import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const booksResult = useQuery(ALL_BOOKS)
  const meResult = useQuery(ME)
  if (!props.show) {
    return null
  }

  if (booksResult.loading || meResult.loading) {
    return <div>loading...</div>
  }

  const BookItem = ({ book }) => (
    <tr>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )
  const genre = meResult.data.me.favoriteGenre

  const books = booksResult.data.allBooks
    .filter((book) => book.genres.includes(genre))
    .map((book) => <BookItem key={book.title} book={book} />)

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{genre}</b>
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
    </div>
  )
}

export default Recommend
