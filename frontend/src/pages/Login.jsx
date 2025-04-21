// import React from 'react'
import { Form, Input, Button, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {

  const { Title } = Typography;

  const onFinish = (values) => {
    console.log('Success:', values);
    // Here you would typically make an API call to log in the user
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 15, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          Login
          <Divider style={{ margin: '10px 0' }} />
        </Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <a className="login-form-forgot" href="/forgot-password">
              Forgot your password?
            </a>
            <a href="/create-account">Create account</a>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login