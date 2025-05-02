import userModel from "../models/userModel";


const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        const cartData = await userData.cartData;
        if (cartData[itemId]) {
            if (cartData[itemId][size] > 0) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData: cartData });
        res.status(200).json({ message: "Item added to cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        const cartData = await userData.cartData;
        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, { cartData: cartData });
        res.status(200).json({ message: "Cart is updated." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const getUserCart = async (req, res) => {
    try {
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        const cartData = await userData.cartData;
        res.status(200).json({ cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export { addToCart, updateCart, getUserCart };