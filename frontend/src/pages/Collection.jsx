// import React from 'react'
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import ShopFilters from "../components/ShopFilters";
import { Button, Col, Dropdown, Empty, Row } from "antd";
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import { defaultSorting, filterOptions, sortItems } from "../utils/constant";
import ProductItem from "../components/ProductItem";
import Search from "antd/es/input/Search";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [filters, setFilters] = useState([]);
  const [sortedBy, setSortedBy] = useState(defaultSorting);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const onSortClick = (e) => {
    const selectedItem = sortItems.find(item => item.key === e.key);
    if (selectedItem) {
      setSortedBy(selectedItem.value);
    }
  };

  const filterProducts = (products, filters) => {
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

  const sortProducts = (products) => {
    switch (sortedBy) {
      case 'Low to High':
        setFilteredProducts(products.sort((a, b) => (a.price - b.price)));
        break;

      case 'High to Low':
        setFilteredProducts(products.sort((a, b) => (b.price - a.price)));
        break;

      default:
        setFilteredProducts(products)
        break;
    }
  }

  const searchProducts = (products, searchString) => {
    const searchLower = searchString.toLowerCase();
    if (searchString !== '') {
      const searchedProducts = products.filter(product => {
        return "name" in product && product.name.toLowerCase().includes(searchLower);
      });
      return searchedProducts
    }
    return products;
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setFilteredProducts(products)
  }, [])

  useEffect(() => {
    setFilteredProducts(filterProducts(products, filters))
    setSortedBy(defaultSorting)
    setSearchValue('')
  }, [filters])

  useEffect(() => {
    const sProducts = searchProducts(products, searchValue);
    const productsFiltered = filterProducts(sProducts, filters)
    sortProducts(productsFiltered)
  }, [sortedBy])

  useEffect(() => {
    const sProducts = searchProducts(products, searchValue);
    const productsFiltered = filterProducts(sProducts, filters)
    setFilteredProducts(productsFiltered)
    setSortedBy(defaultSorting)
  }, [searchValue])

  return (
    <div>
      <div className="flex flex-row place-content-between py-10">
        <ShopFilters filterOptions={filterOptions} setFilters={setFilters} />
        <div>
          {/* <Search placeholder="Search" onSearch={onSearch} allowClear style={{ width: 200 }} /> */}
          <Search placeholder="Search" allowClear onChange={handleInputChange} value={searchValue} style={{ width: 300 }} />
        </div>
        <div>
          <Dropdown menu={{
            items: sortItems,
            selectable: true,
            defaultSelectedKeys: [sortItems[0].key],
            selectedKeys: [sortItems.filter((item) => sortedBy === item.value)[0].key],
            onClick: onSortClick,
          }} placement="topRight" >
            <Button>Sort by: {sortedBy}
              <KeyboardArrowDownTwoToneIcon />
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Map Products */}
      <div>
        {filteredProducts.length > 0 ?
          (<Row justify="start" gutter={[10, 30]}>
            {filteredProducts.map((item) => (
              <Col span={6} key={`col_${item._id}`} style={{
                display: 'flex',
                justifyContent: 'center',
              }}>
                <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
              </Col>
            ))}
          </Row>) :
          (<Empty
            style={{ height: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 }}
            description={<span>No products match your current filters</span>}
          />)}
      </div>
    </div>
  )
}

export default Collection