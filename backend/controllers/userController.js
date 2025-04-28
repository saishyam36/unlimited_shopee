import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
}



// User login route
const loginUser = async (req, res) => {


}



// User registration route
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = createToken(newUser._id)
        success = true
        res.json({ message: "User registered successfully", success, token, user: { name: newUser.name, email: newUser.email } })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}


// Admin login route
const loginAdmin = async (req, res) => {

}


export { loginUser, registerUser, loginAdmin }