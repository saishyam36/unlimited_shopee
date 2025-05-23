// import React from 'react'
import { Form, Input, Button, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const SignUp = () => {

  const { Title } = Typography;
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const onFinish = async (values) => {
    const { name, email, password } = values;
    try {
      const response = await axios.post(`${backendUrl}/user/register`, {
        name,
        email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      message.success(response.data.message);
    } catch (error) {
      console.log('Error signing up:', error.response);
      if (error?.response?.data?.message) {
        message.error(error.response.data.message);
      }
      else {
        message.error(error.response.data.errors[0].msg);
      }
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
          Sign Up
          <Divider style={{ margin: '10px 0' }} />
        </Title>
        <Form
          name="signUp"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Please enter your Name.' }
              , { min: 5, message: 'Please enter atleast 5 characters.' },
              { max: 20, message: 'Please enter atmost 20 characters.' },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon mr-1" />} placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              // { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon mr-1" />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please enter your password!' },
              { min: 6, message: 'Please enter atleast 6 characters!' },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon mr-1" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'end', marginBottom: 24 }}>
            <Link to="/login">
              <Button size='small' color='default' className='font-mono' variant='link'>Login In Here</Button>
            </Link>
          </div>

          <Form.Item>
            <Button type="default" variant='solid' color='default' htmlType="submit" block size="middle">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default SignUp