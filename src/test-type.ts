import express, { Request, Response, Router } from "express";
import session from "express-session";
import { Role } from "./types";

const app = express();

// 解析JSON请求体（必须在路由前配置）
app.use(express.json());

// 配置 session 中间件
app.use(
  session({
    secret: "admin123", // 生产环境建议从环境变量获取
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1天有效期
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// 扩展SessionData类型以支持userx字段（放在路由前）
// declare module "express-session" {
//   interface SessionData {
//     userx?: {
//       userId: string;
//       username: string;
//       role: string;
//     };
//   }
// }

const authRoutes: Router = express.Router();

// 登录接口
const login = (req: Request, res: Response) => {
  // 实际项目中这里应该先验证用户名密码
  const { username } = req.body;

  // 存储用户信息到session
  req.session.user = {
    userId: "12",
    username: username || "toms",
    role: Role.USER,
    email: "toms@example.com",
  };

  // 保存session
  req.session.save((err) => {
    if (err) return res.status(500).send("登录失败：无法保存会话");
    res.send(`登录成功，欢迎 ${req.session.user?.username}`);
  });
};

// 登出接口
const logout = (req: Request, res: Response) => {
  // 销毁session
  req.session.destroy((err) => {
    if (err) return res.status(500).send("登出失败");
    res.send("登出成功");
  });
};

// 测试接口：获取当前登录用户
const getCurrentUser = (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).send("未登录");
  }
  res.send(`当前登录用户：${req.session.user.username}`);
};

// 注册路由
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.get("/me", getCurrentUser);

// 挂载路由
app.use("/api/auth", authRoutes);

// 启动服务器
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
