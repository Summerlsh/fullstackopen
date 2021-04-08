import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Recommend = ({ show, genre }) => {
  const [listBooksByGenre, booksResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (genre) {
      listBooksByGenre({ variables: { genre } })
    }
  }, [genre, listBooksByGenre])

  if (!show) {
    return null
  }
  if (booksResult.called && booksResult.loading) {
    return <div>loading...</div>
  }

  const BookItem = ({ book }) => (
    <tr>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )
  const books = booksResult.data?.allBooks.map((book) => (
    <BookItem key={book.title} book={book} />
  ))

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
