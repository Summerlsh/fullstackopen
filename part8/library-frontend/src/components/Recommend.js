import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const [genre, setGenre] = useState('')
  const [listBooksByGenre, booksResult] = useLazyQuery(ALL_BOOKS)
  const meResult = useQuery(ME)

  useEffect(() => {
    if (meResult.data?.me) {
      setGenre(meResult.data.me.favoriteGenre)
    }
  }, [meResult.data])

  useEffect(() => {
    if (genre) {
      listBooksByGenre({ variables: { genre } })
    }
  }, [genre, listBooksByGenre])

  if (!props.show) {
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
  const books = booksResult.data.allBooks.map((book) => (
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
