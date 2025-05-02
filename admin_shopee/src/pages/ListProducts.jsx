import { Button, Table } from 'antd'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import useApp from 'antd/es/app/useApp';
import { createStyles } from 'antd-style';
import { backendApiUrl } from '../utils/constant';

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const ListProducts = ({ token }) => {
  const [dataSource, setDataSource] = useState([]);
  const { message } = useApp();
  const { styles } = useStyle();

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
      const response = await axios.delete(backendApiUrl + '/product/remove/' + removedRow._id, { headers: { token } });
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
      const response = await axios.get(backendApiUrl + '/product/list', { headers: { token } });
      const products = await response.data.products.map((product, index) => ({
        key: index,
        _id: product._id,
        image: <img src={product.image[0]} alt={product.name} style={{ width: 80, height: 80 }} />,
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
      <Table
        className={styles.customTable}
        scroll={{ x: 'max-content', y: 450 }}
        tableLayout='fixed'
        size='large'
        pagination={{ pageSize: 10, position: ['bottomCenter'] }}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  )
}

export default ListProducts