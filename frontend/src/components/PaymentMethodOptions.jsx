import React, { useState } from 'react';
import { Typography, Radio, Button, Divider } from 'antd';

const { Text, Title } = Typography;

const PaymentMethodOptions = ({ paymentOptions, onPaymentSelect, placeOrderIsDisabled }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
    if (onPaymentSelect) {
      onPaymentSelect(e.target.value);
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: '20px auto', padding: 5, border: '1px solid #f0f0f0' }} className='w-full flex flex-col justify-between'>
      <Title level={4} style={{ marginBottom: 16 }}>
        PAYMENT METHOD
        <Divider style={{ margin: '8px 0' }} />
      </Title>
      <Radio.Group onChange={handlePaymentChange} value={selectedPayment} style={{ marginBottom: 12 }}>
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
              {!option.image && (  <Text>{option.name}</Text>)}
              </div>
            </Radio>
          ))}
      </Radio.Group>
      <Button disabled={!selectedPayment && !placeOrderIsDisabled} type="default" color="default" block size="middle" variant="solid">
        PLACE ORDER
      </Button>
    </div>
  );
};

export default PaymentMethodOptions;