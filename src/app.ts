import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { usersRouter } from "./routes/user.routes";
import { config } from "./config";
import session from "express-session";

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log("session:", session);
// session
// 配置session（放在路由之前）
app.use(
  session({
    secret: process.env.SESSION_SECRET || "wx_123456",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // 生产环境需开启HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1天有效期
    },
  })
);

// 路由
app.use("/api", authRoutes);
app.use("/api", usersRouter);

// 根路由
app.get("/", (req, res) => {
  res.send("Authentication API is running");
});
app.get("/err", (req, res) => {
  throw new Error("this is an error");
});
// src/routes/index.ts
app.get("/async-error", async (req, res, next) => {
  function _getUserFromDb() {
    return new Promise(() => {
      throw new Error("this is an async error");
    });
  }

  const data = await _getUserFromDb();
  return res.json({ user: data }).end();
});

// 错误处理中间件
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err) {
      console.error(err.stack);
      res.status(500).json({
        code: 500,
        success: false,
        message: err.message,
      });
      res.end();
      return;
    }
    next();
  }
);

// 启动服务器
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
