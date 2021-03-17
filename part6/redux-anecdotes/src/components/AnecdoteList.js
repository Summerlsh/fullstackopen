import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { voteTo } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(voteTo(anecdote.id))}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList
