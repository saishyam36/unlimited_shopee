import express from 'express';
import { body } from 'express-validator';
import { addProduct,listProducts,removeProduct,displayProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post(
    '/add',
    [body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('price').notEmpty().withMessage('Price is required'),
    body('image').notEmpty().withMessage('Image is required'),
    body('image').isArray().withMessage('Image must be an array'),
    body('category').notEmpty().withMessage('Category is required'),
    body('subCategory').notEmpty().withMessage('SubCategory is required'),
    body('sizes').isArray().withMessage('Sizes must be an array'),
    body('sizes').notEmpty().withMessage('Sizes is required'),
    body('sizes.*').notEmpty().withMessage('Sizes cannot be empty'),
    body('bestseller').optional().isBoolean().withMessage('Bestseller must be a boolean'),
    body('date').isNumeric().withMessage('Date must be a number')],
    addProduct
);

productRouter.get('/list', listProducts);

productRouter.get('/display/:id', displayProduct);

productRouter.delete('/remove/:id', removeProduct);

export default productRouter;