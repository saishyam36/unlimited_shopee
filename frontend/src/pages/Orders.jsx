import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Row, Col, Card, Button, Space, message, Tag, Skeleton } from 'antd';
import Title from "../components/Title";
import axios from "axios";
import { formatDate } from "../utils/common";

const Orders = () => {
  const { products, backendUrl, currency, orderUpdated, setOrderUpdated } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed':
        return 'processing';
      case 'Packing':
        return 'geekblue';
      case 'Shipped':
        return 'gold';
      case 'Out for delivery':
        return 'lime';
      case 'Delivered':
        return 'green';
      default:
        return 'default';
    }
  };


  const cartGrid = () => {
    if (loading) {
      // Render skeleton loading for each potential cart item
      return Array.from({ length: 3 }).map((_, index) => ( 
        <Col key={`skeleton-${index}`} md={24} lg={24}>
          <Card size="default">
            <Row gutter={5} align="middle">
              <Col md={2} lg={3}>
                <Skeleton.Avatar active size={80} shape="square"/>
              </Col>
              <Col md={20} lg={21}>
                <Skeleton paragraph={{ rows: 2 }} active />
              </Col>
            </Row>
          </Card>
        </Col>
      ));
    }
    if (cartData.length >= 1) {
      return cartData.map((cartItem, index) => {
        const item = products.find(product => product._id === cartItem._id);
        if (!item) {
          return <Col key={index} md={24} lg={24}><div>Product information not found.</div></Col>;
        }
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
                        <Tag color={getStatusColor(cartItem.status)} className="font-medium text-sm" bordered style={{ height: '30px', minWidth: '80px', lineHeight: '30px', padding: '0 15px' }}>{cartItem.status}</Tag>
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

  const getOrderData = async (token) => {
    if (!token) {
      message.error('Please login to view your orders');
      return;
    }
    setLoading(true)
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      getOrderData(storedToken);
    } else {
      message.error('Please login to view your orders');
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (orderUpdated) {
      getOrderData(storedToken);
      setOrderUpdated(false)
    }
  }, [orderUpdated])

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