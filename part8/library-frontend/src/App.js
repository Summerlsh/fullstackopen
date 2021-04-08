import React, { useEffect, useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ME, BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const { data, refetch } = useQuery(ME)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const allBooksInCache = client.readQuery({ query: ALL_BOOKS }).allBooks
    // 判断缓存中是否已存在addedBook
    if (!allBooksInCache.map((book) => book.id).includes(addedBook.id)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: allBooksInCache.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      alert(`a new book ${addedBook.title} has been added!`)
      updateCacheWith(addedBook)
    },
  })

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  useEffect(() => {
    refetch()
  }, [token, refetch])

  useEffect(() => {
    if (data?.me) {
      setFavoriteGenre(data.me.favoriteGenre)
    }
  }, [data])

  const handleLogout = () => {
    localStorage.removeItem('library-user-token')
    setToken('')
    client.resetStore()
    // 登出后返回首页
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={handleLogout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <NewBook
        show={page === 'add'}
        favoriteGenre={favoriteGenre}
        updateCacheWith={updateCacheWith}
      />

      <Recommend show={page === 'recommend'} genre={favoriteGenre} />
    </div>
  )
}

export default App
