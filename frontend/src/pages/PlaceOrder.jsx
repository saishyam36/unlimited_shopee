// import React from 'react'
import { useContext, useState } from "react";
import CartTotal from "../components/CartTotal"
import { assets } from "../assets/assets";
import PaymentMethodOptions from "../components/PaymentMethodOptions";
import DeliveryInformationForm from "../components/DeliveryInformationForm";
import { Button, message } from "antd";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const PlaceOrder = () => {
  const [infoFilled, setInfoFilled] = useState(false);
  const [paymentSelected, setPaymentSelected] = useState(false);
  const { navigate,setCartItems, token, selectedPaymentMethod, cartItems, products, backendUrl, deliveryFee, getCartAmount, } = useContext(ShopContext);
  const [deliveryInfo, setDeliveryInfo] = useState({});

  const paymentMethods = [
    {
      value: 'stripe',
      name: 'Stripe',
      image: assets.stripe_logo,
    },
    {
      value: 'razorpay',
      name: 'Razorpay',
      image: assets.razorpay_logo,
    },
    {
      value: 'cash_on_delivery',
      name: 'CASH ON DELIVERY',
      image: '',
    },
  ];

  const handlePlaceOrder = async () => {
    try {
      const orderItems = [];

      for (const itemsId in cartItems) {
        for (const itemSize in cartItems[itemsId]) {
          if (cartItems[itemsId][itemSize] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === itemsId));
            if (itemInfo) {
              itemInfo.size = itemSize;
              itemInfo.quantity = cartItems[itemsId][itemSize];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      console.log('orderItems', orderItems);

      let orderData = {
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
        address: deliveryInfo,
      }

      let response;

      switch (selectedPaymentMethod) {
        case 'CASH ON DELIVERY':
          response = await axios.post(`${backendUrl}/order/place`, orderData, { headers: { token } });
          break;
        case 'Stripe':
          response = await axios.post(`${backendUrl}/order/placestripe`, orderData, { headers: { token } });
          break;
        case 'Razorpay':
          response = await axios.post(`${backendUrl}/order/placerazorpay`, orderData, { headers: { token } });
          break;

        default:
          break;
      }

      if(response.status === 200) {
        setCartItems({});
        navigate('/orders')
        message.success(response.data.message);
        console.log('Order placed successfully:', response.data);
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  console.log('deliveryInfo', deliveryInfo);

  return (
    <div className="flex flex-row justify-between mb-40">
      <div className="flex flex-row flex-1">
        <DeliveryInformationForm setDeliveryInfo={setDeliveryInfo} setInfoFilled={setInfoFilled} />
      </div>
      <div className="flex flex-col justify-start flex-1">
        <CartTotal showCheckout={false} />
        <PaymentMethodOptions
          paymentOptions={paymentMethods}
          setPaymentSelected={setPaymentSelected}
        />
        <div className="flex justify-center mt-10">
          <Button onClick={handlePlaceOrder} className="w-[50%]" disabled={!paymentSelected || !infoFilled} type="default" color="default" size="small" variant="solid">
            PLACE ORDER
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder