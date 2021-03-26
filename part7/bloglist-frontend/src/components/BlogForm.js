import React from 'react'
import { Button, Form, Input, Typography } from 'antd'

const BlogForm = ({ createBlog }) => {
  const [form] = Form.useForm()
  const handleSubmit = (values) => {
    createBlog({
      title: values.title,
      author: values.author,
      url: values.url
    })

    form.resetFields()
  }

  return (
    <div>
      <Typography.Title level={2}>Create new blog</Typography.Title>
      <Form
        form={form}
        name="basic"
        onFinish={handleSubmit}
        labelCol={{ span: 1 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item label="Title" name="title">
          <Input/>
        </Form.Item>
        <Form.Item label="Author" name="author">
          <Input/>
        </Form.Item>
        <Form.Item label="Url" name="url">
          <Input/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default BlogForm
