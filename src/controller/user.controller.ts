import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  /**
   * /users
   */
  getAllUsers = async (req: Request, res: Response) => {
    let users = await this.userService.getAllUsers();
    users = users.map((item: any) => {
      const { password, ...userWithoutPassword } = item;
      return userWithoutPassword;
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: "successfully",
      data: users,
    });
  };
  getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "user not found",
        data: null,
      });
    }
    const { password, ...userWithoutPassword } = user;
    return res.status(200).json({
      code: 200,
      success: true,
      message: "successfully",
      data: userWithoutPassword,
    });
  };
  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password, bio, avatar, role } = req.body;
    const user = await this.userService.getUserById(id);
    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "user not found",
        data: null,
      });
    }
    const updatedUser = await this.userService.updateUser(
      id,
      email,
      password,
      bio,
      avatar,
      role
    );
    const { password: updatedPassword, ...userWithoutPassword } = updatedUser;
    return res.status(200).json({
      code: 200,
      success: true,
      message: "successfully",
      data: userWithoutPassword,
    });
  };
  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "user not found",
        data: null,
      });
    }
    await this.userService.deleteUser(id);
    return res.status(200).json({
      code: 200,
      success: true,
      message: "successfully",
      data: null,
    });
  };
}
