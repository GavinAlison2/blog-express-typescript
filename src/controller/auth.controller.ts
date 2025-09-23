import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterRequest, LoginRequest } from "../types";
// import {} from "../type/express.d";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         userId: string;
//         username: string;
//         email: string;
//         role: string;
//       };
//       session: {
//         user?: {
//           userId: number;
//           username: string;
//           email: string;
//           role: string;
//         };
//         save: (callback: (err: any) => void) => void;
//         destroy: (callback: (err: any) => void) => void;
//       };
//     }
//   }
// }

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * 处理用户注册
   */
  register = async (req: Request, res: Response) => {
    try {
      const data: RegisterRequest = req.body;

      // 验证请求数据
      if (!data.username || !data.email || !data.password) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "All fields are required",
          data: null,
        });
      }

      const user = await this.authService.register(data);
      const { password, ...userWithoutPassword } = user;

      return res.status(201).json({
        code: 201,
        success: true,
        message: "User registered successfully",
        data: userWithoutPassword,
        // user: userWithoutPassword,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: error.message,
          data: null,
        });
      }
      return res.status(500).json({
        code: 500,
        success: false,
        message: "Server error",
        data: null,
      });
    }
  };

  /**
   * 处理用户登录
   */
  login = async (req: Request, res: Response) => {
    try {
      const data: LoginRequest = req.body;

      // 验证请求数据
      if (!data.email || !data.password) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "Email and password are required",
          data: null,
        });
      }

      const result = await this.authService.login(data);
      const { user, token } = result;

      // 提取需要存储到session的用户信息（排除敏感数据）
      const userSessionData = {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      req.session.user = userSessionData;

      req.session.save((err) => {
        if (err) {
          console.error("Failed to save session:", err);
          return res.status(500).json({
            code: 500,
            success: false,
            message: "Failed to save session",
            data: null,
          });
        }

        // 登录成功响应
        return res.status(200).json({
          code: 200,
          success: true,
          message: "Login successful",
          token,
          data: {
            user: userSessionData,
          },
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: error.message,
          data: null,
        });
      }
      return res.status(500).json({
        code: 500,
        success: false,
        message: "Server error",
        data: null,
      });
    }
  };

  /**
   * 获取当前登录用户信息
   */
  getCurrentUser = async (req: Request, res: Response) => {
    try {
      // 优先从session获取用户信息
      if (req.session.user) {
        return res.status(200).json({
          code: 200,
          success: true,
          message: "User retrieved successfully",
          data: { ...req.session.user },
        });
      }
      // 如果session中没有，再从JWT验证的用户信息获取
      if (!req.user) {
        return res.status(401).json({
          code: 401,
          success: false,
          message: "Authentication required",
          data: null,
        });
      }

      const user = await this.authService.getUserById(req.user.userId);

      if (!user) {
        return res.status(601).json({
          code: 601,
          success: false,
          message: "User not found",
          data: null,
        });
      }

      const { password, ...userWithoutPassword } = user;

      return res.status(200).json({
        code: 200,
        success: true,
        message: "User found",
        data: userWithoutPassword,
        // user: userWithoutPassword,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        message: "Server error",
        data: null,
      });
    }
  };
  /**
   * 用户登出 - 销毁session
   */
  logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
      req.session.user = undefined;
      if (err) {
        return res.status(500).json({
          code: 500,
          success: false,
          message: "Failed to logout",
          data: null,
        });
      }

      res.status(200).json({
        code: 200,
        success: true,
        message: "Logout successful",
        data: null,
      });
    });
  };
}
