import express from "express";
import { AuthController } from "../controller/auth.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

const authController = new AuthController();
const authMiddleware = new AuthMiddleware();
// 公开路由
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// 受保护路由（需要登录）
router.get("/me", authMiddleware.authenticate, authController.getCurrentUser);

export default router;
