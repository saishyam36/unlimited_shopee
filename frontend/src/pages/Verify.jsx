import { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { message } from "antd";


const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }
            const response = await axios.post(`${backendUrl}/order/verifyStripe`, { orderId, success }, { headers: { token } });
            if (response.data.success) {
                setCartItems({});
                navigate('/orders');
                message.success(response.data.message);
            } else {
                navigate('/cart');
                message.error(response.data.message);
            }
        } catch (error) {
            console.log('Error verifying payment:', error);
            message.error(error.response.data.message);
        }

    }

    useEffect(() => {
        verifyPayment();
    }, [token]);

    return (
        <div>
            
        </div>
    )
}

export default Verify