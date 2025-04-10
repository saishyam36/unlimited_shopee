import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title";
import { Col, Row } from "antd";
import ProductItem from "./ProductItem";

const LatestCollections = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [])
  return (
    <div className="my-10">
      <div className="my-5">
        <div className="text-center py-5">
          <Title text1={'LATEST'} text2={'COLLECTIONS'}></Title>
        </div>
      </div>

      <Row gutter={[10, 24]}>
        {latestProducts.map((item) => (
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

export default LatestCollections