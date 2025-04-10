// import React from 'react'
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import ShopFilters from "../components/ShopFilters";
import { Button, Col, Dropdown, Row } from "antd";
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import { defaultSorting, filterOptions, sortItems } from "../utils/constant";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [filters, setFilters] = useState([]);
  const [sortedBy, setSortedBy] = useState(defaultSorting);
  const [filteredProducts, setFilteredProducts] = useState([]);

  console.log(filters, 'selectedFilters')

  const onSortClick = (e) => {
    const selectedItem = sortItems.find(item => item.key === e.key);
    if (selectedItem) {
      setSortedBy(selectedItem.label);
    }
  };

  const filterProducts = (products, filters)=> {
    return products.filter(product => {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          const filterValues = filters[key];
          const productValue = product[key];
  
          if (filterValues && filterValues.length > 0) {
            if (!filterValues.includes(productValue)) {
              return false; // Product doesn't match the filter for this key
            }
          }
        }
      }
      return true; // Product matches all active filters
    });
  }

  useEffect(() => {
    setFilteredProducts(products)
  }, [])

  useEffect(() => {
    const productsFiltered = filterProducts(products,filters)
    setFilteredProducts(productsFiltered)
  }, [filters,setFilters,sortedBy])


  return (
    <div>
      <div className="flex flex-row place-content-between py-10">
        <ShopFilters filterOptions={filterOptions} setFilters={setFilters} />
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
        <Row justify="start" gutter={[10, 30]}>
          {filteredProducts.map((item) => (
            <Col span={6} key={`col_${item._id}`} style={{
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