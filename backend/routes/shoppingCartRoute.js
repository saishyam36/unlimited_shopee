import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";
import authUser from "../middleware/userAuth.js";


const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.delete("/remove", authUser, removeFromCart);
cartRouter.get("/get", authUser, getCart);

export default cartRouter;