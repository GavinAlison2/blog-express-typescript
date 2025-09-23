import bcrypt from "bcryptjs";

export class BcryptUtil {
  public static async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  /**
   *
   * @param password input password
   * @param hashedPassword db hashedpassword
   * @returns
   */
  public static async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
