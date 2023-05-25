import express from "express";
import { deposit, logIn,/* logOut ,*/ newPass, resetPass, signUp } from "../Controllers/userController.js";
import {protect, user} from "../middleware/authMiddleware.js";
const router = express.Router();

// SIGN-UP
router.post('/register', signUp)

// Login
router.post('/login', logIn)

// Pay to wallet]
router.put('/pay', deposit)

// Forgot password 
router.post('/r-pass', resetPass)
router.post('/n-pass', newPass)

// Log-Out
// router.post('/logout', logOut)

export default router       
