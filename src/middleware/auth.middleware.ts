import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { JwtPayload, Role } from "../types";
import { JwtUtils } from "../utils/jwt.utils";

// 扩展Request接口以包含用户信息
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export class AuthMiddleware {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * 验证用户是否已登录
   */
  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 获取Authorization头
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          code: 401,
          success: false,
          message: "Authentication required",
          data: null,
        });
      }

      // 提取令牌
      const token = authHeader.split(" ")[1];

      // 验证令牌
      const payload = JwtUtils.verifyToken(token);
      req.user = payload;
      // 还需验证一下session id是否一致
      const session_user = req.session.user;
      if (
        !session_user ||
        !session_user.userId ||
        session_user.userId !== payload.userId
      ) {
        throw new Error("Invalid session");
      }
      next();
    } catch (error) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Invalid or expired token",
        data: null,
      });
    }
  };

  /**
   * 验证用户是否为管理员
   */
  isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Authentication required",
        data: null,
      });
    }

    if (req.user.role !== Role.ADMIN) {
      return res.status(403).json({
        code: 403,
        success: false,
        message: "Access denied: Admin role required",
        data: null,
      });
    }

    next();
  };
}
