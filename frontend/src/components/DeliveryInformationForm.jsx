import React, { useEffect } from 'react';
import { Form, Input, Typography, Row, Col, Divider } from 'antd';

const { Title } = Typography;

const DeliveryInformationForm = ({setDeliveryInfo, setInfoFilled }) => {
  const [form] = Form.useForm();
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'street', 'city', 'state', 'zipcode', 'country'];

  const onValuesChange = (_,allValues) => {
    const allFilled = requiredFields.every(field => allValues[field]);
    setInfoFilled && setInfoFilled(allFilled);
    if(allFilled){
        setDeliveryInfo(allValues);
    }
  };


  useEffect(() => {
    const initialValues = form.getFieldsValue(requiredFields);
    const initiallyFilled = requiredFields.every(field => initialValues[field]);
    if (setInfoFilled) {
      setInfoFilled(initiallyFilled);
    }
  }, [form, setInfoFilled]);

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', padding: 10, border: '1px solid #f0f0f0' }} className='w-full flex flex-col justify-start'>
      <Title level={4} className='mb-2 text-2xl'>
        DELIVERY INFORMATION
        <Divider className='my-2' />
      </Title>
      <Form
        form={form}
        layout="vertical"
        autoComplete="on"
        onValuesChange={onValuesChange}
      >
        <Row gutter={6}>
          <Col span={12}>
            <Form.Item
              label="First name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter your first name!' }]}
            >
              <Input placeholder="First name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter your last name!' }]}
            >
              <Input placeholder="Last name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={6}>
          <Col span={12}>
            <Form.Item
              label="Email address"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email address!' },
                { type: 'email', message: 'Please enter a valid email address!' },
              ]}
            >
              <Input placeholder="Email address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: 'Please enter your phone number!' },
                { pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, message: 'Please enter a valid phone number!' },
              ]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Street"
          name="street"
          rules={[{ required: true, message: 'Please enter your street address!' }]}
        >
          <Input placeholder="Street" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please enter your city!' }]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: 'Please enter your state!' }]}
            >
              <Input placeholder="State" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Zipcode"
              name="zipcode"
              rules={[
                { required: true, message: 'Please enter your zipcode!' },
                { pattern: /^[0-9]{5}(?:-[0-9]{4})?$/, message: 'Please enter a valid zipcode (e.g., 12345 or 12345-6789)!' },
              ]}
            >
              <Input placeholder="Zipcode" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: 'Please enter your country!' }]}
            >
              <Input placeholder="Country" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DeliveryInformationForm;