import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, InputNumber, Checkbox, Upload, Image } from 'antd';
import { backendApiUrl, maxProductImages, productCategoryItems, productSizeItems, productSubCategoryItems } from '../utils/constant';
import useApp from 'antd/es/app/useApp';
import axios from 'axios';
import { getBase64 } from '../utils/common';

const AddProduct = ({token}) => {

  const [form] = Form.useForm();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const filteredSizes = productSizeItems.filter((size) => !selectedSizes.includes(size.label));
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const { message } = useApp();

  const handleFormSubmit = async (values) => {
    if (fileList.length < 1) {
      message.error('Please upload at least one image!');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', values.productName);
      formData.append('description', values.productDescription);
      formData.append('category', values.productCategory);
      formData.append('subCategory', values.productSubCategory);
      formData.append('sizes', JSON.stringify(values.productSizes));
      formData.append('price', values.productPrice);
      formData.append('bestseller', values.bestSeller?? false);
      fileList.forEach((file, index) => {
        formData.append(`image${index + 1}`, file.originFileObj);
      });

      const response = await axios.post(backendApiUrl + '/product/add', formData, {headers: {token}});
      message.success(response.data.message);
      form.resetFields();
      setFileList([]);
      setSelectedSizes([]);
      setPreviewImage('');
    } catch (error) {
      message.error('Failed to add product! Please try again.');
      console.error('Error adding product:', error);
    }

  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };  

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <div className='flex flex-col items-start justify-center'>
      <Form
        layout={'vertical'}
        form={form}
        onFinish={handleFormSubmit}
        // onValuesChange={onFormLayoutChange}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label={`Upload Images (Max : ${maxProductImages})`} valuePropName="fileList" required={true}>
          <Upload
            beforeUpload={() => false}
            onPreview={handlePreview}
            fileList={fileList}
            onChange={handleChange}
            multiple
            type="select"
            listType="picture-card"
            maxCount={maxProductImages}
          >
            {fileList.length < maxProductImages && (
              <button
                style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                type="button"
              >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: visible => setPreviewOpen(visible),
                afterOpenChange: visible => !visible && setPreviewImage(''),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>
        <Form.Item label="Product Name" name="productName" rules={[{ required: true, message: 'Please enter product name!' }]}>
          <Input placeholder="Enter product name" maxLength={'60'} size='middle' style={{ width: 520, resize: 'none' }} />
        </Form.Item>
        <Form.Item label="Product Description" name="productDescription" rules={[{ required: true, message: 'Please enter product description!' }]}>
          <Input.TextArea placeholder="Enter product description" size='middle' rows={'4'} maxLength={'300'} showCount style={{ height: 150, width: 520, resize: 'none' }} />
        </Form.Item>
        <div className='flex flex-row items-start justify-start gap-4' style={{ width: 400 }}>
          <Form.Item label="Product Category" name="productCategory" rules={[{ required: true, message: 'Please select product category!' }]}>
            <Select
              style={{ width: 150 }}
              allowClear
              options={productCategoryItems}
              placeholder="select category"
              dropdownAlign={{ offset: [0, 8] }}
            />
          </Form.Item>
          <Form.Item label="Sub Category" name="productSubCategory" rules={[{ required: true, message: 'Please select product sub category!' }]}>
            <Select
              style={{ width: 150 }}
              allowClear
              options={productSubCategoryItems}
              placeholder="select sub category"
              dropdownAlign={{ offset: [0, 8] }}
            />
          </Form.Item>
          <Form.Item label="Product Sizes" name="productSizes" rules={[{ required: true, message: 'Please select product sizes!' }]}>
            <Select
              mode='multiple'
              maxTagCount={2}
              style={{ width: 180 }}
              allowClear
              value={selectedSizes}
              onChange={(value) => {
                setSelectedSizes(value);
                form.setFieldsValue({ productSizes: value });
              }}
              showSearch={false}
              options={filteredSizes}
              placeholder="select sizes"
              dropdownAlign={{ offset: [0, 8] }}
            />
          </Form.Item>
        </div>
        <Form.Item label="Product Price" name="productPrice" rules={[{ required: true, message: 'Please enter product price!' }]}>
          <InputNumber min={0} prefix="₹" placeholder="Enter price" size='middle' style={{ width: 150, resize: 'none' }} />
        </Form.Item>
        <Form.Item label={null} name="bestSeller" valuePropName="checked">
          <Checkbox>Add to bestseller</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' size='large' type="default" variant='solid' color='default'>Add Product</Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default AddProduct