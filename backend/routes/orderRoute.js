import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, userOrders, allOrders, updateStatus } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/userAuth.js';

const orderRouter = express.Router();

// Admin routes
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Place order routes
orderRouter.post('/place', userAuth, placeOrder);
orderRouter.post('/placestripe', userAuth, placeOrderStripe);
orderRouter.post('/placerazorpay', userAuth, placeOrderRazorpay);

// User orders route
orderRouter.post('/userorders', userAuth, userOrders);

export default orderRouter;
