import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title";

const LatestCollections = () => {
    const {products} = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
      setLatestProducts(products.slice(0,10));
    },[])
  return (
    <div className="my-10">
      <div className="text-center py-5">
        <Title text1={'Latest'} text2={'Collections'}></Title>
      </div>
    </div>
  )
}

export default LatestCollections