import express from "express";
import { getUserCart, addToCart, updateCart } from "../controllers/cartController.js";
import authUser from "../middleware/userAuth.js";


const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/get", authUser, getUserCart);

export default cartRouter;