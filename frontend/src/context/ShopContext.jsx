import { createContext, useMemo,useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { currency, deliveryFee } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import {message} from "antd";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [orderTime, setOrderTime] = useState(null);
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_Unlimited_BACKEND_URL;
    const [products, setProducts] = useState([]);

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

    const getProductsData = async () => {
        try{
            const response = await axios.get(`${backendUrl}/product/list`);
            console.log(response);
            if(response.status === 200) {
                const data = await response.data;
                console.log('Products data:', data.products);
                setProducts(data.products);
            }
        }catch (error) {
            message.error('Error fetching products data:', error.response.data.message);
            console.log('Error fetching products data:', error);
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);


    const value = useMemo(() => ({
        products, currency, deliveryFee, cartItems, addToCart, setSelectedPaymentMethod, selectedPaymentMethod,
        getCartCount, updateCart, deleteCartItem, getCartAmount, navigate, orderTime, setOrderTime
    }), [products, currency, deliveryFee, addToCart, cartItems, setSelectedPaymentMethod, selectedPaymentMethod,
        getCartCount, updateCart, deleteCartItem, getCartAmount, navigate, orderTime, setOrderTime]);

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;