// import React from 'react'

import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import ShopFilters from "../components/ShopFilters";
import { Button, Col, Dropdown, Row } from "antd";
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import { filterOptions, sortItems } from "../utils/constant";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortedBy, setSortedBy] = useState('Sort by: Relavent');
  const [filteredProducts, setFilteredProducts] = useState([]);

  console.log(selectedFilters, 'selectedFilters')

  const onSortClick = (e) => {
    const selectedItem = sortItems.find(item => item.key === e.key);
    if (selectedItem) {
      setSortedBy(selectedItem.label);
    }
  };

  useEffect(() => {
    setFilteredProducts(products)
  }, [])


  return (
    <div>
      <div className="flex flex-row place-content-between py-10">
        <ShopFilters filterOptions={filterOptions} setSelectedFilters={setSelectedFilters} />
        <div>
          <Dropdown menu={{
            items: sortItems,
            selectable: true,
            defaultSelectedKeys: [sortItems[0].key],
            onClick: onSortClick,
          }} placement="topRight" >
            <Button>{sortedBy}
              <KeyboardArrowDownTwoToneIcon />
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Map Products */}
      <div>
        <Row justify="space-between" gutter={[10, 30]}>
          {filteredProducts.map((item) => (
            <Col span={6} key={`col_${item._id}`}  style={{
              display: 'flex',         
              justifyContent: 'center',
            }}>
              <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
            </Col>
          ))}
        </Row>

      </div>
    </div>
  )
}

export default Collection