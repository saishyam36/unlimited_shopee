// import React from 'react'
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";
import { currency } from "../utils/constant";

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
          <div className="flex-1 flex flex-col-reverse gap-3 justify-items-center border-2 border-inherit border-gray-500">
            <div className="flex flex-row gap-x-3 justify-center overflow-auto">
              {
                productData.image.map((item, index) => (
                  <img onClick={()=> setImage(item)} src={item} key={index} className="w-[20%] cursor-pointer" alt='' />
                ))
              }
            </div>
            <div className="flex justify-center">
              <img src={image} alt="" className="w-[80%] h-auto"></img>
            </div>
          </div>
          {/* Product Info */}
          <div className="flex-1">
            <h1 className="font-sans text-3xl mt-2">{productData.name}</h1>
            <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          </div>

        </div>
      </div>) :
      (<div className="opacity-0"></div>)
  )
}

export default Product