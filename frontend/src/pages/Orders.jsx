import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Row, Col, Card, Button, Space, Typography } from 'antd';
import Title from "../components/Title";

const Orders = () => {
  const { products, currency, cartItems, selectedPaymentMethod, orderTime } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const { Text } = Typography;

  console.log(cartItems)

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
                        <p className="font-mono">Date: {orderTime}</p>
                        <p className="font-mono">Quantity: {cartItem.quantity}</p>
                        <p className="font-mono">Payment: {selectedPaymentMethod}</p>
                      </div>
                    </Col>
                    <Col>
                      <Space align="center">
                        <Text className="text-lg" type="success">Order Placed</Text>
                      </Space>
                    </Col>
                    <Col>
                      <Space align="center">
                        <Button type="dashed" color="default" size="middle" variant="filled">
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

  useEffect(() => {
    const tempData = [];
    for (const itemsId in cartItems) {
      for (const itemSize in cartItems[itemsId]) {
        if (cartItems[itemsId][itemSize] > 0) {
          tempData.push({
            _id: itemsId,
            size: itemSize,
            quantity: cartItems[itemsId][itemSize]
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItems])

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