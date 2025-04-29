import express from 'express';
import { body } from 'express-validator';
import { addProduct, listProducts, removeProduct, displayProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();

// Function to dynamically generate image fields
const generateImageFields = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        name: `image${i + 1}`,
        maxCount: 1,
    }));
};

productRouter.post(
    '/add',
    upload.fields(generateImageFields(4)), // Replace 5 with the desired number of images
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('price').notEmpty().withMessage('Price is required'),
        body('category').notEmpty().withMessage('Category is required'),
        body('subCategory').notEmpty().withMessage('SubCategory is required'),
        body('sizes').notEmpty().withMessage('Sizes is required'),
        body('sizes.*').notEmpty().withMessage('Sizes cannot be empty'),
        body('bestseller').optional().isBoolean().withMessage('Bestseller must be a boolean'),
    ],
    addProduct
);

productRouter.get('/list', listProducts);

productRouter.get('/display/:id', displayProduct);

productRouter.delete('/remove/:id', removeProduct);

export default productRouter;