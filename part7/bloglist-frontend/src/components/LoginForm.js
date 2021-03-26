import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button, Typography, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import Notification from './Notification'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    dispatch(
      login({
        username: values.username,
        password: values.password,
      })
    )

    form.resetFields()
  }

  return (
    <div className="login-page">
      <Typography.Title style={{ margin: 50 }}>Log in to application</Typography.Title>
      <Notification content={notification.message} type="error"/>
      <Form
        size="large"
        form={form}
        className="login-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon"/>}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon"/>}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
