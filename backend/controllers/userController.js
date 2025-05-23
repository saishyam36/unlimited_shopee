import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
}

// User login route
const loginUser = async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User doesn't exists", success })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials", success })
        } else {
            const token = createToken(user._id)
            success = true
            res.json({ message: "User logged in successfully", success, token })
        }

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }

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
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        const { email, password } = req.body;

        const user = email === process.env.ADMIN_EMAIL;
        if (!user) {
            return res.status(400).json({ message: "Admin doesn't exists", success })
        }

        const isMatch = password === process.env.ADMIN_PASSWORD;
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials", success })
        } else {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            success = true
            res.json({ message: "Admin logged in successfully", success, token })
        }

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}


export { loginUser, registerUser, loginAdmin }