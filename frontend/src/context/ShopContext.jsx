/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useMemo, useState } from "react";
import { products } from "../assets/assets";
import { currency, deliveryFee } from "../utils/constant";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size] > 0) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData);
    }

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems])


    const value = useMemo(() => ({
        products, currency, deliveryFee, cartItems, addToCart
    }), [products, currency, deliveryFee, addToCart, cartItems]);

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;