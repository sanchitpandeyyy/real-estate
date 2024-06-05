import express from "express";
import { auth } from "../controllers/auth.controllers.js"

const router = express.Router();

router.post('/signup', auth)

export default router;