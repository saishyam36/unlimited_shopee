// import React from 'react'

import { assets } from "../assets/assets"
import Title from "../components/Title"

const About = () => {
  return (
      <div className="pb-20">
        <div className="my-2">
          <div className="text-center py-2">
            <Title text1={'About'} text2={'Us'}></Title>
          </div>
        </div>
        <div className="my-10 flex flex-col md:flex-row gap-10">
          <img className="w-full md:max-w-[550px]" src={assets.about_img} alt="" />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
            <p>Driven by a passion for innovation and a vision to reshape online shopping, Unlimited Shopee was created. Our core aspiration was to build a platform where everyone could easily discover, explore, and buy a wide range of products from the comfort of their own home</p>
            <p>Since launch, we've focused on handpicking a diverse and high-quality selection of products to suit many tastes and needs. From the latest in fashion and beauty to cutting-edge electronics and essential home goods, our wide inventory comes proudly from trusted brands and suppliers.</p>
            <b className="text-gray-800">Our Mission</b>
            <p>At Unlimited Shopee, our core aim is to provide shoppers with unparalleled choice, ease, and assurance in their online purchases. We are committed to crafting a smooth and exceptional shopping journey that goes beyond standard expectations, encompassing every step from initial browsing and order placement to the final delivery and beyond.</p>
          </div>
        </div>
      </div>
  )
}

export default About