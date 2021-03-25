import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return action.payload
    default:
      return state
  }
}

export const listUsers = () => {
  return async dispatch => {
    const users = await userService.listUsers()
    dispatch({
      type: 'GET_ALL_USERS',
      payload: users
    })
  }
}

export default userReducer
