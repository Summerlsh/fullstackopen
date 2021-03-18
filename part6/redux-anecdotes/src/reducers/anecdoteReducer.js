import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const updatedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id === updatedAnecdote.id
          ? updatedAnecdote
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

export const voteTo = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

export default reducer
