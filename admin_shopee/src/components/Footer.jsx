import React from 'react'
import { assets } from '../assets/assets'
import { copyRightText, phoneNumber, shopDescription, shopEmail } from '../utils/constant'

const Footer = () => {
    return (
        <div className='pt-20'>
            <div className='flex flex-initial gap-10 my-10 mt-45 text-sm' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <img src={assets.logo} className="mb-5 w-40" alt="" />
                    <p className='w-[40rem] text-gray-600'>
                        {shopDescription}
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-3'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-500'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div >
                    <p className='text-xl font-medium mb-3'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-500'>
                        <li>{phoneNumber}</li>
                        <li>{shopEmail}</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr/>
                <p className='py-5 text-sm text-center'>{copyRightText}</p>
            </div>
        </div>
    )
}

export default Footer