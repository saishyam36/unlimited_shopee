import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"

const LatestCollections = () => {
    const {products, currency, deliveryFee} = useContext(ShopContext);
  return (
    <div></div>
  )
}

export default LatestCollections