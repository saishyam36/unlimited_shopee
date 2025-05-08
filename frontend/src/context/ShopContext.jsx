import { createContext, useMemo, useEffect, useState } from "react";
import { currency, deliveryFee } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_Unlimited_BACKEND_URL;
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(null);

    const connectToOrderStatusStream = (token) => {
        if (!token) {
            console.warn('Authentication token is missing. SSE connection not established.');
            return; // Do not proceed if there's no token
        }

        const eventSource = new EventSource(`${backendUrl}/order/status-stream?token=${token}`);

        eventSource.onmessage = function (event) {
            const data = JSON.parse(event.data);
            console.log('Message from server:', data);
            message.success(data.message)
        };

        eventSource.onerror = function (event) {
            console.error('Error occurred:', event);
        };

        eventSource.onopen = function (event) {
            console.log('Connection opened:', event);
        }

        // Handle connection close event.
        eventSource.onclose = function (event) {
            console.log('Connection closed:', event);
        };

        return eventSource;
    }

    const addToCart = async (itemId, size) => {
        try {
            const response = await axios.post(`${backendUrl}/cart/add`,
                { itemId, size },
                { headers: { token } }
            );
            message.success(response.data.message);
        } catch (error) {
            message.error(error.response.data.message);
            console.log('Error adding item to cart:', error);
        }
        getCartItems(token);
    }

    const updateCart = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        try {
            const response = await axios.post(`${backendUrl}/cart/update`,
                { itemId, size, quantity },
                { headers: { token } }
            );
            message.success(response.data.message);
            setCartItems(cartData);
        } catch (error) {
            message.error(error.response.data.message);
            console.log('Error adding item to cart:', error);
        }
    }

    const getCartItems = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/cart/get`, {}, { headers: { token } });
            if (response.status === 200) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            message.error(error.response.data.message);
            console.log('Error fetching cart items:', error);
        }
    }


    const deleteCartItem = async (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId][size] !== undefined) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }
        try {
            const response = await axios.post(`${backendUrl}/cart/update`,
                { itemId, size, quantity: 0 },
                { headers: { token } }
            );
            message.success(response.data.message);
            setCartItems(cartData);
        } catch (error) {
            message.error(error.response.data.message);
            console.log('Error adding item to cart:', error);
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
        try {
            const response = await axios.get(`${backendUrl}/product/list`);
            if (response.status === 200) {
                const data = await response.data;
                setProducts(data.products);
            }
        } catch (error) {
            message.error('Error fetching products data:', error.response.data.message);
            console.log('Error fetching products data:', error);
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!token && storedToken) {
            setToken(storedToken);
            getCartItems(storedToken);
            connectToOrderStatusStream(storedToken);
        }
    }, []);


    const value = useMemo(() => ({
        products, currency, deliveryFee, cartItems, addToCart, setSelectedPaymentMethod, selectedPaymentMethod,
        getCartCount, updateCart, deleteCartItem, getCartAmount, navigate,
        token, setToken, backendUrl, setCartItems
    }), [products, currency, deliveryFee, addToCart, cartItems, setSelectedPaymentMethod, selectedPaymentMethod,
        getCartCount, updateCart, deleteCartItem, getCartAmount, navigate
        , token, setToken, backendUrl, setCartItems]);

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;