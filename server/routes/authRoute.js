import express from "express";
import { authenticateUser, register } from "../controllers/authController.js";
const router = express.Router();

router.route("/register").post(register);
router.post("/login", authenticateUser);
export default router;
