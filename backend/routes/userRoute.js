import express from 'express';
import { loginUser, registerUser, loginAdmin } from '../controllers/userController.js';
import { body } from 'express-validator';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register',[
    body('name', 'Minimum length is 5').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character').isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        maxLength: 16,
    })
], registerUser);
userRouter.post('/admin', loginAdmin);

export default userRouter;