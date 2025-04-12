// import React from 'react'
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";

const Product = () => {

  const { productID } = useParams();
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState('');
  const [image, setImage] = useState('')

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productID) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [])

  return (
    productData ? (
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        {/* Product Data */}
        <div className="flex gap-10 flex-row">
          {/* Product Images */}
          <div className="flex-1 flex flex-row gap-3">
            <div className="flex flex-col gap-y-3 overflow-x-auto">
              {
                productData.image.map((item, index) => (
                  <img src={item} key={index} className="w-[30%] cursor-pointer" alt='' />
                ))
              }
            </div>
            <div className="w-full">
              <img src={image} alt="" className="w-full h-auto"></img>
            </div>
          </div>
          {/* Product Info */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          </div>

        </div>
      </div>) :
      (<div className="opacity-0"></div>)
  )
}

export default Product