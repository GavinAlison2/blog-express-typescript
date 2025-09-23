import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { config } from "./config";

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use("/api/auth", authRoutes);

// 根路由
app.get("/", (req, res) => {
  res.send("Authentication API is running");
});

// 错误处理中间件
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Something went wrong!" });
  }
);

// 启动服务器
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
