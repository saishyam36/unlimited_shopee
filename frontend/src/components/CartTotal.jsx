import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Divider, Button, Typography } from 'antd';


const CartTotal = ({ showCheckout }) => {
    const { currency, deliveryFee, getCartAmount, navigate } = useContext(ShopContext);
    const subtotal = getCartAmount();
    const { Text } = Typography;

    return (
        <div style={{ maxWidth: 300, margin: '20px auto', padding: 5, border: '1px solid #f0f0f0' }} className='w-full flex flex-col justify-between'>
            <Typography.Title level={4} className='mb-2 text-2xl'>
                CART TOTALS
                <Divider className='my-2' />
            </Typography.Title>
            <div className={`flex flex-col ${showCheckout ? 'mb-4' : ''}`}>
                <div className='flex justify-between mb-1'>
                    <Text>Subtotal</Text>
                    <Text>{currency}{subtotal}</Text>
                </div>
                <div className='flex justify-between mb-4'>
                    <Text>Shipping Fee</Text>
                    <Text>{currency}{deliveryFee}</Text>
                </div>
                <Divider className='my-2' />
                <div className={`flex justify-between`}>
                    <Text strong>Total</Text>
                    <Text strong>
                        {subtotal != 0 ? `${currency}${subtotal + deliveryFee}` : `${currency}0`}
                    </Text>
                </div>
            </div>
            {showCheckout ? (
                <Button onClick={() => navigate('/place-order')} disabled={subtotal === 0} type="default" color="default" block size="middle" variant="solid">
                    PROCEED TO CHECKOUT
                </Button>) : <div hidden />}
        </div>

    )
}

export default CartTotal