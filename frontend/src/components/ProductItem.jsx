import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({id,image,name,ProductItem}) => {
    const {currency} = useContext(ShopContext);
  return (
    <div>ProductItem</div>
  )
}

export default ProductItem