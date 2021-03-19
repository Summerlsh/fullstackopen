const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.content
    }
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}
let timeoutID
export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    console.log(timeoutID)
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, timeout * 1000)
  }
}

export default reducer
