import { Divider } from 'antd'
import React from 'react'

const Title = ({ text1, text2 }) => {
    return (
        <Divider  style={{
            border: 'none', // Remove the default border
            height: '5px', // Set the desired height of the "bulk"
            margin: '10px', // Adjust vertical margins as needed
          }} >
            <div className='inline-flex gap-2 items-center text-3xl'>
            <p className='text-gray-500'>{text1} <span className='text-gray-700 font-medium'>{text2}</span></p>
            </div>
        </Divider>
    )
}

export default Title