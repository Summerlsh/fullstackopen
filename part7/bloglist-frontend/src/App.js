import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import './App.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { getLoggedInUser, logout } from './reducers/loginReducer'
import BlogList from './components/BlogList'
import Users from './components/Users'
import UserDetails from './components/UserDetails'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const matchedUser = useRouteMatch('/users/:id')

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  return loggedInUser === null ? (
    <LoginForm/>
  ) : (
    <div>
      <header>
        <Link to="/blogs">blogs</Link>
        <Link to="/users">users</Link>
        <span>{loggedInUser.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </header>

      <h2>blog app</h2>
      <Notification
        content={notification.message}
        type={notification.messageType}
      />

      <Switch>
        <Route exact path="/">
          <BlogList/>
        </Route>
        <Route exact path="/users">
          <Users/>
        </Route>
        <Route path="/users/:id">
          <UserDetails id={matchedUser?.params.id}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App
