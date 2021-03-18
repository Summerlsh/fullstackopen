const initialNotification = ''

const reducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET': {
      return action.data.content
    }
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

export const setNotification = (content) => {
  return {
    type: 'SET',
    data: {
      content
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

export default reducer
