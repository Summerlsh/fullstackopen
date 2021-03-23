import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import Notification from './Notification'

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit
}) => {
  const notification = useSelector(state => state.notification)

  return (
    <div>
      <h2>log in to application</h2>
      <Notification content={notification.message} type="error"/>
      <form onSubmit={handleSubmit}>
        <div>
          username <input value={username}
            id="username"
            type="text"
            onChange={handleUsernameChange}/>
        </div>
        <div>
          password <input value={password}
            id="password"
            type="password"
            onChange={handlePasswordChange}/>
        </div>
        <button type="submit" id="loginBtn">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm
