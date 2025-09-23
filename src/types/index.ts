// 用户角色枚举
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

// 用户信息接口
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

// 注册请求接口
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// 登录请求接口
export interface LoginRequest {
  email: string;
  password: string;
}

// JWT payload接口
export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
  role: Role;
}
