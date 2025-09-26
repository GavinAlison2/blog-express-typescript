import { prisma } from "../utils/prisma.sql.utils";

export class UserService {
  /**
   * getAllUsers
   */
  async getAllUsers(): Promise<any> {
    const users = await prisma.user.findMany({
      where: { status: "active" },
    });

    if (!users || users.length === 0) {
      throw new Error("No users found");
    }
    return users;
  }

  /**
   * 通过ID获取用户
   */
  async getUserById(id: string): Promise<any | null> {
    return prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }

  async updateUser(id: string, ...data: any): Promise<any | null> {
    console.log(data);
    // return prisma.user.update({
    //   where: { id: Number(id) },
    //   data: { ...data },
    // });
  }

  async deleteUser(id: string): Promise<any | null> {
    return prisma.user.delete({
      where: { id: Number(id) },
    });
  }
}
