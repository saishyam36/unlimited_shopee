// import React from 'react'
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Row, Col, Card, Button, InputNumber, Space, Typography, Empty } from 'antd';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateCart, 
    deleteCartItem } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  const handleQuantityChange = (value, size, itemId) => {
    updateCart(itemId, size, value)
  };

  const handleRemoveItem = (itemId, size) => {
    deleteCartItem(itemId, size)
  };

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
                    style={{ width: '60%', height: 'auto' }}
                  />
                </Col>
                <Col md={20} lg={20} className="ml-[-20px]">
                  <Row justify="space-between" align="middle">
                    <Col>
                      <div>
                        <p className="text-xs sm:text-lg font-mono mb-4">{item.name}</p>
                        <div className="flex items-center gap-5 mt-2">
                          <p className="text-lg font-mono">{currency}{item.price}</p>
                          <Button size="large" key={index} type="default" shape="circle" className='bg-gray-200 text-lg font-mono'>
                            {cartItem.size}
                          </Button>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <Space align="center">
                        <InputNumber
                          min={1}
                          defaultValue={cartItem.quantity}
                          onChange={(value) => handleQuantityChange(value, cartItem.size, item._id)}
                          size="middle"
                          value={cartItem.quantity}
                          style={{ width: 100 }}
                          className="mx-5"
                        />
                        <DeleteOutlinedIcon fontSize="medium" onClick={() => handleRemoveItem(item._id, cartItem.size)} className="cursor-pointer" />
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
    else {
      return (
        <Col span={24} >
          <Empty
            style={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            className="pt-10"
            description={<Typography.Text type="secondary">Your cart is empty.</Typography.Text>}
          />
        </Col >
      )
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
        <Title text1={'Shopping'} text2={'Cart'}></Title>
      </div>
      <Row gutter={[16, 16]}>
        {cartGrid()}
      </Row>
      <div className="text-center pt-20 pb-5">
        <Title text1={'Total'} text2={'Price'}></Title>
      </div>
      <CartTotal showCheckout={true} />
    </div>
  )
}

export default Cart