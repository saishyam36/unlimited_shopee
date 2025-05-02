// import React from 'react'
import { Form, Input, Button, Typography, Divider, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Login = () => {

  const { Title } = Typography;
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const response = await axios.post(`${backendUrl}/user/login`, {
        email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      message.success(response.data.message);
    } catch (error) {
      console.log('Error logging in:', error.response.data.message);
      message.error(error.response.data.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500 }}>
      <div style={{ background: '#fff', padding: 15, borderRadius: 15, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', width: 350 }}>
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
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password!' },
              { min: 6, message: 'Please enter atleast 6 characters!' },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <Link className="login-form-forgot">
              <Button size='small' color='default' className='font-mono' variant='link'>Forgot password</Button>
            </Link>
            <Link to="/create-account">
              <Button size='small' color='default' className='font-mono' variant='link'>Create account</Button>
            </Link>
          </div>

          <Form.Item>
            <Button type="default" variant='solid' color='default' htmlType="submit" block size="middle">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login