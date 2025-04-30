// import React from 'react'
import { Form, Input, Button, Typography, Divider, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { apiUrl } from '../App';

const Login = ({setToken}) => {

  const [loginForm] = useForm();
  const navigate = useNavigate();
  const { Title } = Typography;

  const onFinish = async (values) => {
    try {
      const response = await axios.post(apiUrl + '/admin', {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        setToken(token);
        alert('Login successful!');
        navigate('/add', { replace: true });
      }

    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed! Please check your credentials.');

    }

  };

  const onFinishFailed = (errorInfo) => {
    loginForm.resetFields();
    console.log('Failed:', errorInfo);

  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500 }}>
      <div style={{ background: '#fff', padding: 15, borderRadius: 15, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', width: 350 }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          Admin Login
          <Divider style={{ margin: '10px 0' }} />
        </Title>
        <Form
          form={loginForm}
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