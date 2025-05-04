import useApp from 'antd/es/app/useApp';
import React, { useEffect, useState } from 'react'
import { backendApiUrl, currency, orderStatusOptions } from '../utils/constant';
import axios from 'axios';
import { assets } from '../assets/assets';
import { Image, Select } from 'antd';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const { message } = useApp();

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(`${backendApiUrl}/order/list`, {}, { headers: { token } });
      console.log(response.data.orders);
      setOrders(response.data.orders);
    } catch (error) {
      console.log('Error fetching orders:', error);
      message.error(error.response.data.message);
    }
  }

  const handleStatusChange = async (orderId, value) => {
    try {
      const response = await axios.post(`${backendApiUrl}/order/status`, { orderId, status: value }, { headers: { token } });
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return { ...order, status: value };
        }
        return order;
      });
      setOrders(updatedOrders);
      message.success(response.data.message);
    } catch (error) {
      console.log('Error updating order status:', error);
      message.error(error.response.data.message);
    }

  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div>
      {orders.map((order, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
          <div className="flex items-center justify-center gap-2">
            <Image src={assets.parcel_icon} preview={false} alt="" className="w-15" />
          </div>
          <div className="flex flex-col">
            <div>
              {order.items.map((item, index) => {
                if (order.items.length > 1 && index === order.items.length - 1) {
                  return <p key={index} className="py-0.5"> {item.name} x {item.quantity} <span> {item.size} </span> ,</p>
                } else {
                  return <p key={index} className="py-0.5"> {item.name} x {item.quantity} <span> {item.size} </span></p>
                }
              })}
            </div>
            <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
            <div>
              <p>{order.address.street + ","}</p>
              <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode + ","}</p>
            </div>
            <p className="mt-3">{order.address.phone}</p>
          </div>
          <div>
            <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
            <p className="mt-3">Method : {order.paymentMethod}</p>
            <p>Payment : {order.payment ? "Done" : "Pending"}</p>
            <p>Date : {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <p className="text-sm sm:text-[15px]">{currency + order.amount}</p>
          <Select
            value={order.status}
            onChange={(value) => handleStatusChange(order._id, value)}
            options={orderStatusOptions}
            style={{ width: '100%' }}
          />
        </div>
      ))
      }
    </div >
  )
}

export default Orders