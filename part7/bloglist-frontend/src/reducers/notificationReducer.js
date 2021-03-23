const initialState = {
  message: '',
  messageType: ''
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.message,
        messageType: action.messageType
      }
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, messageType, timeout) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      messageType
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, timeout * 1000)
  }
}

export default notificationReducer
