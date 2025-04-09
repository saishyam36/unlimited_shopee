import React from 'react'
import { Flex } from 'antd'
import SupportAgentTwoToneIcon from '@mui/icons-material/SupportAgentTwoTone';
import TaskAltTwoToneIcon from '@mui/icons-material/TaskAltTwoTone';
import PublishedWithChangesTwoToneIcon from '@mui/icons-material/PublishedWithChangesTwoTone';

const OurPolicy = () => {
    return (
        <div className='py-20'>
            <Flex justify='space-evenly'>
                <div className='text-center'>
                    <PublishedWithChangesTwoToneIcon className='w-16 m-auto mb-2' fontSize='large' />
                    <p className='font-semibold'>Easy Exchange Policy</p>
                    <p className='text-gray-400'>We offer hassle free exchange here</p>
                </div>
                <div className='text-center'>
                    <TaskAltTwoToneIcon className='w-16 m-auto mb-2' fontSize='large' />
                    <p className='font-semibold'>3 Days Easy Return Policy</p>
                    <p className='text-gray-400'>We provide 3 days free return policy</p>
                </div>
                <div className='text-center'>
                    <SupportAgentTwoToneIcon className='w-16 m-auto mb-2' fontSize='large' />
                    <p className='font-semibold'>Excellent Help Desk</p>
                    <p className='text-gray-400'>We have expert support available 24/7</p>
                </div>
            </Flex>
        </div>
    )
}

export default OurPolicy