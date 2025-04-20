// import React from 'react'
import { useState } from "react";
import CartTotal from "../components/CartTotal"
import { assets } from "../assets/assets";
import PaymentMethodOptions from "../components/PaymentMethodOptions";
import DeliveryInformationForm from "../components/DeliveryInformationForm";

const PlaceOrder = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [placeButtonDisabled, setPlaceButtonDisabled] = useState(false);

  const handlePaymentSelect = (paymentValue) => {
    setSelectedPaymentMethod(paymentValue);
    setPlaceButtonDisabled(true)
    console.log('Selected Payment Method:', paymentValue);
    // Implement your logic to handle the selected payment method
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
    <div className="flex flex-row justify-between">
      <div className="flex flex-row flex-1">
        <DeliveryInformationForm  setPlaceButtonDisabled={setPlaceButtonDisabled}/>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <CartTotal showCheckout={false} />
        <PaymentMethodOptions
          paymentOptions={paymentMethods}
          onPaymentSelect={handlePaymentSelect}
          placeOrderIsDisabled={placeButtonDisabled}
        />
      </div>
    </div>
  )
}

export default PlaceOrder