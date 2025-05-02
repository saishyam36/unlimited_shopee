import { Button, Table } from 'antd'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { apiUrl } from '../App';
import useApp from 'antd/es/app/useApp';

const ListProducts = ({ token }) => {
  const [dataSource, setDataSource] = useState([]);
  const { message } = useApp();

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Subcategory',
      dataIndex: 'subcategory',
      key: 'subcategory',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => <Button onClick={() => handleDelete(record.key)} variant='filled' color='danger' shape='circle'>X</Button>,
    },
  ];


  const handleDelete = async (key) => {
    const removedRow = dataSource.find(item => item.key === key);
    try {
      const response = await axios.delete(apiUrl + '/product/remove/' + removedRow._id, { headers: { token } });
      console.log(response.data);
      if (response.status === 200) {
        fetchProducts();
        message.success(response.data.message);
      }
    } catch (error) {
      console.log('Error deleting product:', error.response.data.error);
      message.error(error.response.data.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiUrl + '/product/list', { headers: { token } });
      const products = await response.data.products.map((product, index) => ({
        key: index,
        _id: product._id,
        image: <img src={product.image[0]} alt={product.name} style={{ width: 50, height: 50 }} />,
        name: product.name,
        category: product.category,
        subcategory: product.subCategory,
        price: product.price,
      }));
      setDataSource(products);
    } catch (error) {
      message.error(error.response.data.message);
      console.log('Error fetching products:', error.response.data.error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className='w-full h-full'>
      <Table tableLayout='fixed' size='middle' pagination={{ pageSize: 10, position: ['bottomCenter'] }} columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default ListProducts