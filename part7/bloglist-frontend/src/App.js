import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
  Redirect,
  useHistory,
} from 'react-router-dom'
import { Layout, Menu, Button, Typography } from 'antd'

import './App.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { getLoggedInUser, logout } from './reducers/loginReducer'
import BlogList from './components/BlogList'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import Blog from './components/Blog'

const { Header, Content } = Layout

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const matchedUser = useRouteMatch('/users/:id')
  const matchedBlog = useRouteMatch('/blogs/:id')
  const [current, setCurrent] = useState('blogs')
  const history = useHistory()

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [dispatch])

  useEffect(() => {
    setCurrent(history.location.pathname.slice(1) || 'blogs')
  }, [history])

  const handleClick = (e) => {
    setCurrent(e.key)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return loggedInUser === null ? (
    <LoginForm/>
  ) : (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Header>
        <div style={{ float: 'right', color: '#FFFFFF' }}>
          {loggedInUser.name} logged in
          <Button type="link" onClick={handleLogout}>
            logout
          </Button>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          onClick={handleClick}
        >
          <Menu.Item key="blogs">
            <Link to="/blogs">blogs</Link>
          </Menu.Item>
          <Menu.Item key="users">
            <Link to="/users">users</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Typography.Title style={{ margin: '10px 0' }}>blog app</Typography.Title>
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
          <Route exact path="/blogs">
            <Redirect to="/"/>
          </Route>
          <Route path="/blogs/:id">
            <Blog id={matchedBlog?.params.id}/>
          </Route>
        </Switch>
      </Content>
    </Layout>
  )
}

export default App
