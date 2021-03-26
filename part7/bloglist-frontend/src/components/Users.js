import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'antd'

import { listUsers } from '../reducers/userReducer'

const { Column } = Table

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <Table dataSource={users} rowKey={user => user.id} pagination={false} bordered>
        <Column
          title="Name"
          dataIndex="name"
          render={(name, user) => <Link to={`/users/${user.id}`}>{name}</Link>}
        />
        <Column
          title="Blog created"
          dataIndex="blogs"
          render={(blogs) => <>{blogs.length}</>}
        />
      </Table>
    </div>
  )
}

export default Users
