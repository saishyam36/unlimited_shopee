/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { products } from "../assets/assets";
import { currency, deliveryFee } from "../utils/constant";

export const ShopContext = createContext();

const ShopContextProvider = (props) =>{
    const value= {
        products,currency,deliveryFee
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;