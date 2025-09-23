import jwt from "jsonwebtoken";
import { config } from "../config";
import { JwtPayload } from "../types";

export class JwtUtils {
  /**
   * 生成JWT令牌
   */
  public static generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  /**
   * 验证JWT令牌
   */
  public static verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, config.jwt.secret) as JwtPayload;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
}
