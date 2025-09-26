import express from "express";
import { UserController } from "../controller/user.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router = express.Router();
const usersRouter = express.Router();

const userController = new UserController();
const authMiddleware = new AuthMiddleware();
// 公开路由
usersRouter.get("/users", userController.getAllUsers);
usersRouter.get("/user/:id", userController.getUserById);
usersRouter.put("/user/:id", userController.updateUser);
usersRouter.delete("/user/:id", userController.deleteUser);
// router.post("/login", authController.login);
// router.get("/logout", authController.logout);

// 受保护路由（需要登录）
// router.get("/me", authMiddleware.authenticate, authController.getCurrentUser);
usersRouter.use(authMiddleware.authenticate);

export { usersRouter };
export default router;
