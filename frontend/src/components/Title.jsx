import { Divider } from 'antd'
import React from 'react'

const Title = ({ text1, text2 }) => {
    return (
        <Divider  style={{
            border: 'none', // Remove the default border
            height: '5px',
            margin: '10px',
          }} >
            <div className='inline-flex gap-2 items-center text-2xl'>
            <p className='text-gray-800'>{text1} <span className='text-gray-600 font-medium'>{text2}</span></p>
            </div>
        </Divider>
    )
}

export default Title