import productModel from '../models/productModel.js';
import { v2 as cloudinary } from 'cloudinary';
import { validationResult } from 'express-validator';


const addProduct = async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }

    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const images = Object.keys(req.files).map((key) => req.files[key][0]);

        const imageUrls = await Promise.all(images.map(async (image) => {
            const result = await cloudinary.uploader.upload(image.path, {
                resource_type: 'image',
                folder: 'products',
                width: 250,
                height: 300,
            });
            return result.secure_url;
        }));

        const product = await productModel.create({
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller: bestseller === 'true',
            sizes: JSON.parse(sizes),
            image: imageUrls,
            date: Date.now(),
        });
        success = true;
        res.status(200).json({ message: 'Product added successfully', product, success });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message, success });
    }

}

const listProducts = async (req, res) => {
    let success = false;
    try {
        const products = await productModel.find({})
            .sort({ date: -1 })
            .select('-__v');

        success = true;
        res.status(200).json({ message: 'Products fetched successfully', products, success });

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products! Please try again.', error: error.message, success });
    }

}

const removeProduct = async (req, res) => {
    let success = false;
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found', success });
        }

        success = true;
        res.status(200).json({ message: 'Products removed successfully', success });

    } catch (error) {
        res.status(500).json({ message: 'Server error. Please contact admin', error: error.message, success });
    }

}

const displayProduct = async (req, res) => {
    let success = false;
    try {
        const product = await productModel.findById(req.params.id).select('-__v');

        if (!product) {
            return res.status(404).json({ message: 'Product not found', success });
        }

        success = true;
        res.status(200).json({ message: 'Products fetched successfully', success, product });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message, success });
    }


}

export { addProduct, listProducts, removeProduct, displayProduct };