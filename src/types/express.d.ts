// src/types/express.d.ts
import { JwtPayload } from "./index";
import session from "express-session";

// 扩展express-session的Session接口，添加user属性
declare module "express-session" {
  interface SessionData {
    user?: JwtPayload;
    // save, destroy 已经存在
  }
}

declare global {
  namespace Express {
    interface Request {
      // 补充user类型（与UserRequest一致）
      user?: UserRequest;
      session: import("express-session").Session &
        Partial<import("express-session").SessionData>;
    }
  }
}
