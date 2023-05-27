import express from "express";
import { deposit, fund } from "../Controllers/fundController.js";
import { protect, user } from "../middleware/authMiddleware.js";
const router = express.Router();


// Pay to wallet]
router.put('/:id/pay', protect, user, deposit)

// Create Fund Wallet
router.post('/', protect, user, fund)


export default router       
