const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.content
    }
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, timeout * 1000)
  }
}

export default reducer
