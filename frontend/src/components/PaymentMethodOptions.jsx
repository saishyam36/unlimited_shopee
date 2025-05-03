import React, { useState, useEffect, useContext } from 'react';
import { Typography, Radio, Divider } from 'antd';
import { ShopContext } from '../context/ShopContext';

const { Text, Title } = Typography;

const PaymentMethodOptions = ({ paymentOptions, setPaymentSelected }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { selectedPaymentMethod, setSelectedPaymentMethod } = useContext(ShopContext);

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
    setSelectedPaymentMethod(paymentOptions.find((option) => option.value === e.target.value).name);
    setPaymentSelected(true);
  };

  useEffect(() => {
    if (selectedPaymentMethod) {
      setSelectedPayment(paymentOptions.find((option) => option.name === selectedPaymentMethod).value);
      setPaymentSelected(true);
    }
  }, []);

  return (
    <div style={{ maxWidth: 300, margin: '20px auto', padding: 10, border: '1px solid #f0f0f0' }} className='w-full flex flex-col justify-between'>
      <Title level={4} style={{ marginBottom: 10 }}>
        PAYMENT METHOD
        <Divider style={{ margin: '8px 0' }} />
      </Title>
      <Radio.Group onChange={handlePaymentChange} value={selectedPayment} style={{ marginBottom: 2 }}>
        {paymentOptions &&
          paymentOptions.map((option) => (
            <Radio key={option.value} value={option.value} className='flex flex-row mb-5 mx-2'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.name}
                    style={{ height: 20, marginRight: 4 }}
                  />
                )}
                {!option.image && (<Text>{option.name}</Text>)}
              </div>
            </Radio>
          ))}
      </Radio.Group>
    </div>
  );
};

export default PaymentMethodOptions;