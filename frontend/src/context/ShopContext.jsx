import { createContext, useMemo, useState } from "react";
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

    const updateCart = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity
        setCartItems(cartData);
    }

    const deleteCartItem = (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId][size] !== undefined) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
            setCartItems(cartData);
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemsId in cartItems) {
            for (const itemSize in cartItems[itemsId]) {
                try {
                    if (cartItems[itemsId][itemSize] > 0) {
                        totalCount += cartItems[itemsId][itemSize];
                    }
                } catch (error) {
                    console.log('error', error)
                }
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemsId in cartItems) {
            let itemInfo = products.find((product) => product._id === itemsId)
            for (const itemSize in cartItems[itemsId]) {
                try {
                    if (cartItems[itemsId][itemSize] > 0) {
                        totalAmount += itemInfo.price * cartItems[itemsId][itemSize];
                    }
                } catch (error) {
                    console.log('error', error)
                }
            }
        }
        return totalAmount;
    }


    const value = useMemo(() => ({
        products, currency, deliveryFee, cartItems, addToCart, getCartCount, updateCart, deleteCartItem, getCartAmount
    }), [products, currency, deliveryFee, addToCart, cartItems, getCartCount, updateCart, deleteCartItem, getCartAmount]);

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;