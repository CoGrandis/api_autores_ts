import { authController } from "./authController";
import express from "express";

const router = express.Router()

router.post('/register', authController.registerUser)
router.get('/login', authController.loginUser)
// router.get('/refresh')

export {router}