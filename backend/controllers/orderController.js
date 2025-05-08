import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import { EventEmitter } from 'events'
import { sseAuthUser } from "../middleware/userAuth.js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const currency = 'INR'
const deliveryCharge = 10
const orderStatusEmitter = new EventEmitter()

const sseClients = new Set();

// Place order for user with cash on delivery
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const order = await orderModel.create({
            userId,
            items,
            amount,
            address,
            date: new Date(),
            paymentMethod: 'CASH ON DELIVERY',
            payment: false
        })

        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.status(200).json({
            success: true,
            message: "Order placed successfully",
            orderId: order._id,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "'Failed to place order. Please try again.'",
            error: error.message
        })
        console.log(error.message)
    }
}

// Place order for user with stripe payment gateway
const placeOrderStripe = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        const order = await orderModel.create({
            userId,
            items,
            amount,
            address,
            date: new Date(),
            paymentMethod: 'Stripe',
            payment: false
        })

        const line_items = items.map((item) => {
            return {
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: item.name,
                        images: [item.image[0]],
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            }
        });

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charge",
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
        })


        res.status(200).json({
            success: true,
            session_url: session.url,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to initiate Stripe payment. Please try again.",
            error: error.message
        })
        console.log(error.message)
    }
}

// verify stripe payment and update order status
const verifyStripe = async (req, res) => {
    try {
        const { orderId, success, userId } = req.body
        if (success === "true") {
            const order = await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.status(200).json({
                success: true,
                message: "Order placed successfully",
                order
            })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.status(200).json({
                success: false,
                message: "Order failed. Please try again.",
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error verifying payment. Please try again later.",
            error: error.message
        })
        console.log(error.message)

    }
}

// Place order for user with razorpay payment gateway
// const placeOrderRazorpay = async (req, res) => {
// }

// User order data for shop application
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
        console.log(error.message)

    }
}

//Admin side all orders data
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ date: -1 });

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
        console.log(error.message)

    }
}

// User order status for admin application
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        const orders = await orderModel.findByIdAndUpdate(orderId, { status });

        res.status(200).json({
            success: true,
            message: "Order status updated successfully!",
            orders
        })

        orderStatusEmitter.emit('order-status-changed', orders.userId, orderId, status);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
        console.log(error.message)

    }
}

const updateOrderStatusInUser = (req, res) => {

    const userId = sseAuthUser(req.query.token)
    // console.log(userId,'userID')

    // Set headers for SSE communication
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    sseClients.add(res);

    // Send a welcome message to the client upon connection(for testing purpose)
    // res.write(`data: ${JSON.stringify({ message: 'Welcome to the Order Event Stream!' })}\n\n`);

    const orderStatusListener = (orderUserId, orderId, newStatus) => {
        if (userId === orderUserId) {
            const eventData = {
                orderId: orderId,
                status: newStatus,
                message: `Order status updated to ${newStatus}`,
            };
            res.write(`data: ${JSON.stringify(eventData)}\n\n`);
        }
    };

    orderStatusEmitter.on('order-status-changed', orderStatusListener);

    req.on('close', () => {
        sseClients.delete(res);
        orderStatusEmitter.removeListener('order-status-changed', orderStatusListener);
        console.log('Client disconnected from order status stream');
    });
}

export { placeOrder, updateOrderStatusInUser, verifyStripe, placeOrderStripe, userOrders, allOrders, updateStatus }