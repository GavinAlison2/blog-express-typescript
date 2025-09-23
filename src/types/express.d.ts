// src/types/express.d.ts
import { JwtPayload } from "./index"; // 导入你的JwtPayload类型

export declare global {
  namespace Express {
    interface Request {
      // 补充user类型（与JwtPayload一致）
      user?: JwtPayload;
      // 补充session类型（注意userId类型与JwtPayload统一）
      session: {
        user?: {
          userId: string; // 这里需与JwtPayload中的userId类型一致（你的代码中JwtPayload是string）
          username: string;
          email: string;
          role: string;
        };
        save: (callback: (err: any) => void) => void;
        destroy: (callback: (err: any) => void) => void;
      };
    }
  }
}
