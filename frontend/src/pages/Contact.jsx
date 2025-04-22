// import React from 'react'

import { assets } from "../assets/assets"
import Title from "../components/Title"

const Contact = () => {
  return (
    <div>
      <div className="my-2">
        <div className="text-center py-2">
          <Title text1={'Contact'} text2={'Us'}></Title>
        </div>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-20 mb-28 mr-10">
        <img className="w-full md:max-w-[580px]" src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-2xl text-gray-600">Our Store</p>
          <p className=" text-gray-500">
            D.No. 36, Flat No. S-1, <br />
            Srinagar Colony, Visakhapatnam, <br />
            Andhra Pradesh 530016, India
          </p>
          <p className=" text-gray-500">Tel: +91-9258238986 <br /> Email: contact@unlimited.com</p>
        </div>
      </div>
    </div>
  )
}

export default Contact