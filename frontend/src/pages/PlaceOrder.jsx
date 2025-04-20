// import React from 'react'
import { useContext, useState } from "react";
import CartTotal from "../components/CartTotal"
import { assets } from "../assets/assets";
import PaymentMethodOptions from "../components/PaymentMethodOptions";
import DeliveryInformationForm from "../components/DeliveryInformationForm";
import { Button } from "antd";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [placeButtonDisabled, setPlaceButtonDisabled] = useState(false);
  const { navigate } = useContext(ShopContext);

  const handlePaymentSelect = (paymentValue) => {
    setSelectedPaymentMethod(paymentValue);
    console.log('Selected Payment Method:', paymentValue);
  };

  const paymentMethods = [
    {
      value: 'stripe',
      name: 'stripe',
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

  return (
    <div className="flex flex-row justify-between mb-40">
      <div className="flex flex-row flex-1">
        <DeliveryInformationForm setPlaceButtonDisabled={setPlaceButtonDisabled} />
      </div>
      <div className="flex flex-col justify-start flex-1">
        <CartTotal showCheckout={false} />
        <PaymentMethodOptions
          paymentOptions={paymentMethods}
          onPaymentSelect={handlePaymentSelect}
        />
        <div className="flex justify-center mt-10">
          <Button onClick={() => navigate('/orders')} className="w-[50%]" disabled={selectedPaymentMethod === null || placeButtonDisabled} type="default" color="default" size="small" variant="solid">
            PLACE ORDER
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder