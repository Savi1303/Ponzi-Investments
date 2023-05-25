import express from "express";
import { deleteUser, logIn, signUp } from "../Controllers/adminController.js";
import {protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

// SIGN-UP
router.post('/register', signUp)

// Login
router.post('/login', logIn)

// Delete a user
router.delete('/d-user/:id', protect, admin, deleteUser)


export default router