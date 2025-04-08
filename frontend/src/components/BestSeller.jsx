import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title";
import { Col, Row } from "antd";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [BestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item)=> item.bestseller)
    setBestSellers(bestProducts.slice(0, 8));
  }, [])
  return (
    <div className="my-10">
      <div className="my-5">
        <div className="text-center py-5">
          <Title text1={'BEST'} text2={'SELLERS'}></Title>
        </div>
      </div>

      <Row gutter={[10,24]}>
        {BestSellers.map((item) => (
          <Col flex={"none"} key={`col_${item._id}`} lg={{ span: 6, offset: 0 }} push={2} >
            <ProductItem  id={item._id} image={item.image} name={item.name} price={item.price}></ProductItem>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default BestSeller