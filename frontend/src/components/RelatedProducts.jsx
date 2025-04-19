import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Col, Row } from 'antd';
import ProductItem from './ProductItem';
import Title from './Title';
import { relatedProductsLength } from '../utils/constant';

const RelatedProducts = ({ category, subCategory, selectedProductID }) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const totalProducts = products
            const matchingProducts = totalProducts.filter(
                (item) => item.category === category && item.subCategory === subCategory  && item._id != selectedProductID
              );
              setRelated(matchingProducts.slice(0,relatedProductsLength))
        }
    }, [products,selectedProductID])

    return (
        <div className='mt-20'>
            <div className="text-center py-10">
                <Title text1={'RELATED'} text2={'PRODUCTS'}></Title>
            </div>
            <Row justify="start" gutter={[10, 24]}>
                {related.map((item) => (
                    <Col key={`col_${item._id}`} lg={{ span: 6, offset: 0 }} style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }} >
                        <ProductItem id={item._id} image={item.image} name={item.name} price={item.price}></ProductItem>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default RelatedProducts