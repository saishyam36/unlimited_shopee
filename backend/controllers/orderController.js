import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

// Place order for user with cash on delivery
const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body

        const order = await orderModel.create({
            userId,
            items,
            amount,
            address,
            date: new Date(),
            paymentMethod:'CASH ON DELIVERY',
            payment: false
        })

        await userModel.findByIdAndUpdate(userId, {cartData:{}});
        res.status(200).json({
            success: true,
            message: "Order placed successfully",
            orderId: order._id,
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

// Place order for user with stripe payment gateway
const placeOrderStripe = async (req, res) => {

    try {

    } catch (error) {

    }
}

// Place order for user with razorpay payment gateway
const placeOrderRazorpay = async (req, res) => {

    try {

    } catch (error) {

    }
}

// User order data for shop application
const userOrders = async (req, res) => {
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId}).sort({date: -1});

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
        const {userId} = req.body
        const orders = await orderModel.find({}).sort({date: -1});

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

    } catch (error) {

    }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, userOrders, allOrders, updateStatus }