import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, InputNumber, Checkbox, Upload, Image } from 'antd';
import { maxProductImages, productCategoryItems, productSizeItems, productSubCategoryItems } from '../utils/constant';

const AddProduct = () => {

  const [form] = Form.useForm();
  const [selectedSizes, setSelectedSizes] = useState([]);
  const filteredSizes = productSizeItems.filter((size) => !selectedSizes.includes(size.label));
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    console.log(file);

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Utility function to convert file to base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <div className='flex flex-col items-start justify-center'>
      <Form
        layout={'vertical'}
        form={form}
        // onValuesChange={onFormLayoutChange}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label={`Upload Images (Max : ${maxProductImages})`} valuePropName="fileList">
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
        <Form.Item label="Product Name" name="productName">
          <Input placeholder="Enter product name" maxLength={'30'} size='large' style={{ width: 520, resize: 'none' }} />
        </Form.Item>
        <Form.Item label="Product Description" name="productDescription">
          <Input.TextArea placeholder="Enter product description" size='large' rows={'4'} maxLength={'300'} showCount style={{ height: 150, width: 520, resize: 'none' }} />
        </Form.Item>
        <div className='flex flex-row items-start justify-start gap-4' style={{ width: 400 }}>
          <Form.Item label="Product Category" name="productCategory">
            <Select
              style={{ width: 150 }}
              allowClear
              options={productCategoryItems}
              placeholder="select category"
              dropdownAlign={{ offset: [0, 8] }}
            />
          </Form.Item>
          <Form.Item label="Sub Category" name="productSubCategory">
            <Select
              style={{ width: 150 }}
              allowClear
              options={productSubCategoryItems}
              placeholder="select sub category"
              dropdownAlign={{ offset: [0, 8] }}
            />
          </Form.Item>
          <Form.Item label="Product Sizes" name="productSizes">
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
        <Form.Item label="Product Price" name="productPrice">
          <InputNumber min={0} prefix="₹" placeholder="Enter price" size='middle' style={{ width: 150, resize: 'none' }} />
        </Form.Item>
        <Form.Item label={null} name="bestSeller" valuePropName="checked">
          <Checkbox>Add to bestseller</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button size='large' type="default" variant='solid' color='default'>Add Product</Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default AddProduct