const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      return state.map(anecdote =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    }
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    case 'INITIALIZE': {
      return action.data
    }
    default:
      return state
  }
}

export const voteTo = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INITIALIZE',
    data: anecdotes
  }
}

export default reducer
