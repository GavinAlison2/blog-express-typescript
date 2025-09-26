// import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaClient, Prisma } from "../generated/prisma";

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export class PrismaSqlUtils {
  /**
   * 执行带参数的原生SQL查询（修复参数绑定语法）
   * @param sql 原生SQL语句（使用 ? 作为参数占位符）
   * @param params 参数数组（与SQL中的占位符顺序对应）
   * @returns 查询结果
   */
  public async executeRawQuery<T = any>(
    sql: string,
    params: any[] = []
  ): Promise<T[]> {
    try {
      // 替换 ? 为 Prisma 支持的参数绑定格式
      const parts = sql.split("?");
      if (parts.length - 1 !== params.length) {
        throw new Error(
          `参数数量不匹配：SQL中有 ${parts.length - 1} 个占位符，实际传入 ${
            params.length
          } 个参数`
        );
      }

      // 构建带参数的查询
      let query = Prisma.raw(parts[0]);
      for (let i = 0; i < params.length; i++) {
        query = Prisma.sql`${query} ${params[i]} ${Prisma.raw(parts[i + 1])}`;
      }

      // 执行查询
      const result = await prisma.$queryRaw<T[]>(query);
      return result;
    } catch (error) {
      console.error("原生SQL查询失败:", error);
      throw error;
    }
  }

  /**
   * 执行带参数的原生SQL命令（无返回结果）
   */
  public async executeRawCommand(
    sql: string,
    params: any[] = []
  ): Promise<number> {
    try {
      const parts = sql.split("?");
      if (parts.length - 1 !== params.length) {
        throw new Error(
          `参数数量不匹配：SQL中有 ${parts.length - 1} 个占位符，实际传入 ${
            params.length
          } 个参数`
        );
      }

      let query = Prisma.raw(parts[0]);
      for (let i = 0; i < params.length; i++) {
        query = Prisma.sql`${query} ${params[i]} ${Prisma.raw(parts[i + 1])}`;
      }

      const result = await prisma.$executeRaw(query);
      return result;
    } catch (error) {
      console.error("原生SQL命令执行失败:", error);
      throw error;
    }
  }
  /**
   * 替换命名占位符为问号占位符
   * @param sql 包含命名占位符的SQL语句（格式: :name）
   * @param params 包含命名参数的对象
   * @returns 处理后的SQL和参数数组
   */
  public replaceNamedPlaceholders(
    sql: string,
    params: Record<string, any>
  ): { sql: string; params: any[] } {
    const paramNames = Array.from(
      new Set(sql.match(/:(\w+)/g)?.map((m) => m.slice(1)) || [])
    );
    const paramArray = paramNames.map((name) => {
      if (params[name] === undefined) {
        throw new Error(`缺少命名参数: ${name}`);
      }
      return params[name];
    });

    let processedSql = sql;
    paramNames.forEach((name, index) => {
      processedSql = processedSql.replace(new RegExp(`:${name}\\b`, "g"), `?`);
    });

    return { sql: processedSql, params: paramArray };
  }
  /**
   * 统一处理各种参数格式，转为标准格式
   * 支持：数组传参、REST分散传参、命名参数传参
   * @param sql SQL语句
   * @param params 原始参数列表
   * @returns 处理后的SQL和参数数组
   */
  public normalizeParams(
    sql: string,
    params: any[]
  ): { processedSql: string; paramArray: any[] } {
    let processedSql = sql;
    let paramArray: any[] = [];

    // 情况1：单个数组参数（兼容旧用法）
    if (params.length === 1 && Array.isArray(params[0])) {
      paramArray = params[0];
    }
    // 情况2：最后一个参数是命名参数对象
    else if (
      params.length > 0 &&
      typeof params[params.length - 1] === "object" &&
      !Array.isArray(params[params.length - 1])
    ) {
      const namedParams = params.pop() as Record<string, any>;
      const result = this.replaceNamedPlaceholders(sql, namedParams);
      processedSql = result.sql;
      paramArray = [...params, ...result.params];
    }
    // 情况3：REST分散参数
    else {
      paramArray = params;
    }

    // 验证参数数量与占位符匹配
    const placeholderCount = (processedSql.match(/\?/g) || []).length;
    if (placeholderCount !== paramArray.length) {
      throw new Error(
        `参数数量不匹配：SQL包含${placeholderCount}个占位符，但传入了${paramArray.length}个参数`
      );
    }

    return { processedSql, paramArray };
  }
  /**
   * 执行带参数的原生SQL查询（返回多条记录）
   * @param sql 原生SQL语句（支持?占位符或命名占位符:name）
   * @param params 参数数组或命名参数对象
   * @returns 查询结果数组
   */
  public async queryMany<T = any>(sql: string, ...params: any[]): Promise<T[]> {
    try {
      const { processedSql, paramArray } = this.normalizeParams(sql, params);

      // 拆分SQL并绑定参数
      const parts = processedSql.split("?");
      if (parts.length - 1 !== paramArray.length) {
        throw new Error(
          `参数数量不匹配：SQL中有 ${parts.length - 1} 个占位符，实际传入 ${
            paramArray.length
          } 个参数`
        );
      }

      let query = Prisma.raw(parts[0]);
      for (let i = 0; i < paramArray.length; i++) {
        query = Prisma.sql`${query} ${paramArray[i]} ${Prisma.raw(
          parts[i + 1]
        )}`;
      }

      // 执行查询
      const result = await prisma.$queryRaw<T[]>(query);
      return result;
    } catch (error) {
      console.error("查询多条记录失败:", error);
      throw error;
    }
  }

  /**
   * 执行带参数的原生SQL查询（返回单条记录）
   * @param sql 原生SQL语句（支持?占位符或命名占位符:name）
   * @param params 参数数组或命名参数对象
   * @returns 单条查询结果或null
   */
  public async queryOne<T = any>(
    sql: string,
    ...params: any[]
  ): Promise<T | null> {
    const results = await this.queryMany<T>(sql, ...params);
    return results.length > 0 ? results[0] : null;
  }

  /**
   * 执行更新/删除/插入等SQL命令
   * @param sql 原生SQL语句（支持?占位符或命名占位符:name）
   * @param params 参数数组或命名参数对象
   * @returns 受影响的行数
   */
  public async executeCommand(sql: string, ...params: any[]): Promise<number> {
    try {
      const { processedSql, paramArray } = this.normalizeParams(sql, params);

      // 拆分SQL并绑定参数
      const parts = processedSql.split("?");
      if (parts.length - 1 !== paramArray.length) {
        throw new Error(
          `参数数量不匹配：SQL中有 ${parts.length - 1} 个占位符，实际传入 ${
            paramArray.length
          } 个参数`
        );
      }

      let query = Prisma.raw(parts[0]);
      for (let i = 0; i < paramArray.length; i++) {
        query = Prisma.sql`${query} ${paramArray[i]} ${Prisma.raw(
          parts[i + 1]
        )}`;
      }

      // 执行命令
      const result = await prisma.$executeRaw(query);
      return result;
    } catch (error) {
      console.error("执行SQL命令失败:", error);
      throw error;
    }
  }

  // 使用示例（注意用 ? 作为占位符）
  public async testRawQueries() {
    // 1. 查询示例
    const users = await this.executeRawQuery<Prisma.userSelect>(
      "SELECT * FROM User WHERE id BETWEEN ? AND ?", // 使用 ? 作为占位符
      [1, 10]
    );
    console.log("查询到的用户:", users);

    // 2. 更新示例
    const updatedCount = await this.executeRawCommand(
      "UPDATE Post SET published = ? WHERE authorId = ?",
      [true, 2]
    );
    console.log(`更新了 ${updatedCount} 条记录`);
  }
  // 使用示例
  public async testAllScenarios() {
    // 1. 查询多条记录 - 不带参数
    const allUsers = await this.queryMany<Prisma.userSelect>(
      "SELECT id, name, email FROM User ORDER BY id ASC"
    );
    console.log("所有用户:", allUsers);

    // 2. 查询多条记录 - 带数组参数（?占位符）
    const filteredUsers = await this.queryMany<Prisma.userSelect>(
      "SELECT id, name FROM User WHERE id BETWEEN ? AND ?",
      [1, 5]
    );
    console.log("ID在1-5之间的用户:", filteredUsers);

    // 3. 查询多条记录 - 带命名参数（:name占位符）
    const namedParamUsers = await this.queryMany<Prisma.userSelect>(
      "SELECT id, email FROM User WHERE name LIKE :search",
      { search: "%test%" }
    );
    console.log("名字包含test的用户:", namedParamUsers);

    // 4. 查询单条记录 - 不带参数
    const firstUser = await this.queryOne<Prisma.userSelect>(
      "SELECT * FROM User ORDER BY id ASC LIMIT 1"
    );
    console.log("第一个用户:", firstUser);

    // 5. 查询单条记录 - 带参数
    const specificUser = await this.queryOne<Prisma.userSelect>(
      "SELECT * FROM User WHERE email = ?",
      ["alice@example.com"]
    );
    console.log("指定邮箱的用户:", specificUser);

    // 6. 更新语句 - 不带参数
    const allUnpublished = await this.executeCommand(
      "UPDATE Post SET published = false"
    );
    console.log(`将所有帖子设为未发布，影响行数: ${allUnpublished}`);

    // 7. 更新语句 - 带数组参数
    const updatedPosts = await this.executeCommand(
      "UPDATE Post SET published = true WHERE authorId = ?",
      [2]
    );
    console.log(`更新作者ID为2的帖子，影响行数: ${updatedPosts}`);

    // 8. 更新语句 - 带命名参数
    const namedParamUpdate = await this.executeCommand(
      "UPDATE User SET name = :newName WHERE email = :email",
      { newName: "Updated Name", email: "bob@example.com" }
    );
    console.log(`更新指定用户的名字，影响行数: ${namedParamUpdate}`);

    // 9. 插入语句 - 带参数
    const insertedUser = await this.executeCommand(
      "INSERT INTO User (email, name) VALUES (:email, :name)",
      { email: "temp@example.com", name: "Temporary User" }
    );
    console.log(`插入新用户，影响行数: ${insertedUser}`);

    // 10. 删除语句 - 带参数
    const deletedUser = await this.executeCommand(
      "DELETE FROM User WHERE email = ?",
      ["temp@example.com"]
    );
    console.log(`删除临时用户，影响行数: ${deletedUser}`);
    const specificUserv2 = await this.queryOne<Prisma.userSelect>(
      "SELECT * FROM User WHERE email = ?",
      "alice@example.com"
    );
    console.log("指定邮箱的用户:", specificUserv2);

    // 2. 查询单条记录 - REST分散参数
    const userByRest = await this.queryOne(
      "SELECT * FROM User WHERE email = ?",
      "example@test.com"
    );
    console.log("REST参数查询结果:", userByRest);
  }
  // async function main() {
  // await prisma.$connect();
  //   await testRawQueries();
  // await testAllScenarios();
  // }
  // main()
  //   .catch((e) => console.error("测试失败:", e))
  //   .finally(async () => {
  //     await prisma.$disconnect();
  //   });

  // const RawSqlUtils = {
  //   executeRawQuery,
  //   executeRawCommand,
  //   queryMany,
  //   queryOne,
  //   executeCommand,
  // };
  // 关键修改：以对象形式导出，方便JS中通过 XX.func 调用
  // export const PrismaSqlUtils = {
  //   executeRawQuery,
  //   executeRawCommand,
  //   queryMany,
  //   queryOne,
  //   executeCommand,
  // };
}
