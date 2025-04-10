import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { Card, Flex } from 'antd';
import '../styles/product.css'


const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link classNameName='text-gray-700 cursor-pointer block no-link-spacing' style={{ margin: 0, padding: 0 }} to={`/product/${id}`}>
      <Card
        hoverable
        style={{ width: 260, height: 400 }}
        cover={<img alt="" src={image[0]} />}
      >
        <Flex vertical justify='space-between' className='detail-container'>
          <div>
            <p className="product-name">{name}</p>
          </div>
          <div>
            <p className="product-price">{currency}{price}</p>
          </div>
        </Flex>
      </Card>
    </Link>
  )
}

export default ProductItem