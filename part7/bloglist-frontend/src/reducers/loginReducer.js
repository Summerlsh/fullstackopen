import { notification } from 'antd'

import blogService from '../services/blogs'
import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_LOGGED_IN_USER':
      return action.payload
    case 'USER_LOGIN':
      return action.payload
    case 'USER_LOGOUT':
      return null
    default:
      return state
  }
}

export const getLoggedInUser = () => {
  return async dispatch => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON !== null) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'GET_LOGGED_IN_USER',
        payload: user
      })
    }
  }
}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'USER_LOGIN',
        payload: user
      })
    } catch (err) {
      const res = err.response.data
      notification.error({
        message: res.error
      })
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'USER_LOGOUT'
    })
  }
}

export default loginReducer
