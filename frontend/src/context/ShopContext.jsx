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
    const [orderUpdated, setOrderUpdated] = useState(false);
    const [event, setEvent] = useState('');
    const [loading, setLoading] = useState(false);

    const connectToOrderStatusStream = (token) => {
        if (!token) {
            console.log('Authentication token is missing. SSE connection not established.');
            return;
        }

        const eventSource = new EventSource(`${backendUrl}/order/status-stream?token=${token}`);

        eventSource.onmessage = function (event) {
            const data = JSON.parse(event.data);
            if (data.orderId) {
                setOrderUpdated(true);
                message.success(data.message)
            }
        };

        eventSource.onerror = function (event) {
            console.error('Error occurred');
        };

        eventSource.onopen = function (event) {
            console.log('Connection opened');
        }

        eventSource.onclose = function (event) {
            console.log('Connection closed');
        };
        setEvent(eventSource)
    }

    const addToCart = async (itemId, size) => {
        try {
            const response = await axios.post(`${backendUrl}/cart/add`,
                { itemId, size },
                { headers: { token } }
            );
            message.success(response.data.message);
            getCartItems(token);
        } catch (error) {
            message.error(error.response.data.message);
            console.log('Error adding item to cart:', error);
        }
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
            setLoading(true);
            const response = await axios.post(`${backendUrl}/cart/get`, {}, { headers: { token } });
            if (response.status === 200) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            message.error(error.response.data.message);
            console.log('Error fetching cart items:', error);
        } finally {
            setLoading(false);
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
        const storedToken = localStorage.getItem('token');
        if (!token && storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            setLoading(true);
            getCartItems(token);
            setLoading(false);
            connectToOrderStatusStream(token);
        }
    }, [token]);

    const value = useMemo(() => ({
        products, currency, deliveryFee, cartItems, addToCart, setSelectedPaymentMethod, selectedPaymentMethod,
        getCartCount, updateCart, deleteCartItem, getCartAmount, navigate, loading, setLoading,
        token, setToken, backendUrl, setCartItems, orderUpdated, setOrderUpdated, event
    }), [products, currency, deliveryFee, addToCart, cartItems, setSelectedPaymentMethod, selectedPaymentMethod,
        getCartCount, updateCart, deleteCartItem, getCartAmount, navigate, loading, setLoading
        , token, setToken, backendUrl, setCartItems, orderUpdated, setOrderUpdated, event]);

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;