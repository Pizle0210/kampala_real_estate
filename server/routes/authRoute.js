import express from "express";
import { authenticateUser, google, register } from "../controllers/authController.js";
const router = express.Router();

router.route("/register").post(register);
router.post("/login", authenticateUser);
router.route("/google").post(google);
export default router;
