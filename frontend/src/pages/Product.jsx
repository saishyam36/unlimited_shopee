// import React from 'react'
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";
import { currency } from "../utils/constant";
import { Button, message } from "antd";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {

  const { productID } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState('');
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productID) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  const handleAddToCart = () => {
    if (size !== '') {
      addToCart(productData._id, size)
    } else if (!isErrorVisible) {
        message.error({
          content: 'Please select product size',
          duration: 3,
          top: 100,
          className: 'productError',
          onClose: () => {
            setIsErrorVisible(false);
          },
        });
        setIsErrorVisible(true)
      }
    }

useEffect(() => {
  fetchProductData();
  setSize('')
}, [productID])

return (
  productData ? (
    <div className="border-t-2 pt-10 py-40">
      {/* Product Data */}
      <div className="flex gap-10 flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 justify-items-center border-2 border-inherit border-gray-500 w-[50%]">
          <div className="flex flex-row gap-x-3 justify-center overflow-auto">
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className="w-[20%] cursor-pointer" alt='' />
              ))
            }
          </div>
          <div className="flex justify-center">
            <img src={image} alt="" className="w-[55%] h-auto"></img>
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-semibold text-2xl mt-2">{productData.name}</h1>
          {/* TODO : add star rating related code here */}
          <p className="mt-5 text-3xl font-mono">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-7">
              {productData.sizes.map((item, index) => (
                <Button onClick={() => setSize(item)} size="large" key={index} type="default" shape="circle" className={`${item === size ? 'bg-cyan-100' : 'bg-slate-100'}`}>
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <Button icon={<ShoppingCartOutlinedIcon fontSize="small" />} className="px-4 py-4 text-sm my-2" onClick={handleAddToCart} size="large" color="default" variant="solid">
            Add To Cart
          </Button>
          <hr className="mt-8 sm:w-4/5"></hr>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* {TODO : add review code here when added ratings code} */}
      {/* {Display Related Products} */}
      <div>
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} selectedProductID={productID} />
      </div>
    </div>) :
    (<div className="opacity-0"></div>)
)
}

export default Product