import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import Notification from './Notification'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()

    dispatch(login({
      username: username.value,
      password: password.value
    }))
    username.reset()
    password.reset()
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification content={notification.message} type="error"/>
      <form onSubmit={handleSubmit}>
        <div>
          username <input id="username" {..._.omit(username, ['reset'])}/>
        </div>
        <div>
          password <input id="password" {..._.omit(password, ['reset'])}/>
        </div>
        <button type="submit" id="loginBtn">login</button>
      </form>
    </div>
  )
}

export default LoginForm
