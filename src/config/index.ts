import dotenv from "dotenv";

// 加载环境变量
dotenv.config();

// 配置验证
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

if (!process.env.JWT_EXPIRES_IN) {
  throw new Error("JWT_EXPIRES_IN is not defined in environment variables");
}

export const config = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
};
