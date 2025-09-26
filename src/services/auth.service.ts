import { BcryptUtil } from "../utils/bcrypt.utils";
import { JwtUtils } from "../utils/jwt.utils";
import { PrismaClient, Prisma, users_role } from "../generated/prisma";
import { RegisterRequest, LoginRequest, JwtPayload, Role } from "../types";

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

export class AuthService {
  /**
   * 注册新用户
   */
  async register(data: RegisterRequest): Promise<any> {
    // 检查邮箱是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    // 检查用户名是否已存在
    const existingUsername = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (existingUsername) {
      throw new Error("Username already in use");
    }

    // 密码加密
    const hashedPassword = await BcryptUtil.encodePassword(data.password);

    // 创建用户
    return prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: users_role.user,
        // role: Role.USER,
      },
    });
  }

  /**
   * 用户登录并生成令牌
   */
  async login(
    data: LoginRequest
  ): Promise<{ user: Omit<any, "password">; token: string }> {
    // 查找用户
    const { username, email } = data;
    const where: Prisma.userWhereInput = {};
    if (email) where.email = email;
    if (username) where.username = username;
    // 两者只能存在一个, 默认使用username
    // if (where.email && where.username) {
    //   where.email = null;
    // }

    const user = await prisma.user.findFirst({
      where,
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // 验证密码
    const isPasswordValid = await BcryptUtil.verifyPassword(
      data.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // 生成JWT令牌
    const token = JwtUtils.generateToken({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: Role.USER,
    } as JwtPayload);

    // 移除密码字段
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * 通过ID获取用户
   */
  async getUserById(id: string): Promise<any | null> {
    return prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }
}
