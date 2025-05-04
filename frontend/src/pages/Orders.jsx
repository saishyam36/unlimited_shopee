import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Row, Col, Card, Button, Space, Typography, message } from 'antd';
import Title from "../components/Title";
import axios from "axios";
import { formatDate } from "../utils/common";

const Orders = () => {
  const { products, backendUrl, token, currency } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const { Text } = Typography;

  const cartGrid = () => {
    if (cartData.length >= 1) {
      return cartData.map((cartItem, index) => {
        const item = products.find(product => product._id === cartItem._id);
        return (
          <Col key={index} md={24} lg={24}>
            <Card size="small">
              <Row gutter={5} align="middle">
                <Col md={4} lg={3}>
                  <img
                    alt={item.name}
                    src={item.image[0]}
                    style={{ width: '80%', height: 'auto' }}
                  />
                </Col>
                <Col md={20} lg={20} className="ml-[-10px]">
                  <Row justify="space-between" align="middle">
                    <Col>
                      <div>
                        <p className="text-xs sm:text-lg font-mono mb-2">{item.name}</p>
                        <div className="flex mb-1">
                          <p className="text-sm font-mono mr-5">Price: {currency}{item.price}</p>
                          <p className='text-sm font-mono'>Size: {cartItem.size}</p>
                        </div>
                        <p className="font-mono">Date: {cartItem.date}</p>
                        <p className="font-mono">Quantity: {cartItem.quantity}</p>
                        <p className="font-mono">Payment: {cartItem.paymentMethod}</p>
                      </div>
                    </Col>
                    <Col>
                      <Space align="center">
                        <Text className="text-lg" type="success">{cartItem.status}</Text>
                      </Space>
                    </Col>
                    <Col>
                      <Space align="center">
                        <Button type="default" color="default" size="middle" variant="solid">
                          Track Order
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        )
      })
    }
  };

  const getOrderData = async () => {
    if (!token) {
      message.error('Please login to view your orders');
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/order/userorders`, {}, { headers: { token } });
      const orderData = response.data.orders;
      const allOrderData = [];
      orderData.map((order) => {
        order.items.map((item) => {
          item['payment'] = order.payment;
          item['status'] = order.status;
          item['paymentMethod'] = order.paymentMethod;
          item['date'] = formatDate(order.date);
          allOrderData.push(item);
        })
      });
      setCartData(allOrderData);
    } catch (error) {
      if (error.response?.data) {
        message.error(error.response.data.message);
      } else {
        message.error('Something went wrong!');
      }
      console.log('Error fetching orders:', error);
    }
  }

  useEffect(() => {
    getOrderData();
  }, [])

  return (
    <div className="pb-20">
      <div className="text-center pb-10">
        <Title text1={'My'} text2={'Orders'}></Title>
      </div>
      <Row gutter={[16, 16]}>
        {cartGrid()}
      </Row>
    </div>
  )
}

export default Orders